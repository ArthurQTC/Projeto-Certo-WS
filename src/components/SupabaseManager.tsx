import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getSupabase, BUCKET_NAME } from '../lib/supabase';
import { Upload, File, Image as ImageIcon, Trash2, Copy, Check, AlertCircle, Database, RefreshCw, X, Link } from 'lucide-react';

interface SupabaseFile {
  name: string;
  id: string;
  created_at: string;
  metadata?: {
    size: number;
    mimetype: string;
  };
}

export default function SupabaseManager({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [files, setFiles] = useState<SupabaseFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const client = getSupabase();

  const fetchFiles = async () => {
    if (!client) {
      setError('Credenciais do Supabase ausentes no arquivo .env.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await client.storage.from(BUCKET_NAME).list('', {
        limit: 100,
        sortBy: { column: 'name', order: 'asc' },
      });

      if (err) {
        throw err;
      }

      setFiles(data || []);
    } catch (e: any) {
      console.error(e);
      setError(`Erro ao listar arquivos: ${e.message || 'Verifique se o bucket "ProjetoCerto" foi criado no Supabase.'}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchFiles();
    }
  }, [isOpen]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const uploadFileToSupabase = async (file: File) => {
    if (!client) return;
    setUploading(true);
    setError(null);
    setSuccess(null);
    try {
      // Clean up file name to prevent encoding issues
      const cleanedName = file.name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9.-]/g, '_');

      const fileName = `${Date.now()}_${cleanedName}`;

      const { data, error: uploadErr } = await client.storage
        .from(BUCKET_NAME)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadErr) {
        throw uploadErr;
      }

      setSuccess(`Arquivo "${file.name}" carregado com sucesso!`);
      fetchFiles();
    } catch (e: any) {
      console.error(e);
      setError(`Erro no upload: ${e.message || 'Certifique-se de que o bucket está público.'}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFileToSupabase(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadFileToSupabase(e.target.files[0]);
    }
  };

  const handleDelete = async (name: string) => {
    if (!client) return;
    if (!confirm(`Tem certeza que deseja deletar o arquivo "${name}"?`)) return;

    setError(null);
    setSuccess(null);
    try {
      const { error: delErr } = await client.storage.from(BUCKET_NAME).remove([name]);
      if (delErr) {
        throw delErr;
      }
      setSuccess('Arquivo deletado com sucesso!');
      fetchFiles();
    } catch (e: any) {
      console.error(e);
      setError(`Erro ao deletar: ${e.message}`);
    }
  };

  const copyUrl = (name: string) => {
    if (!client) return;
    const { data } = client.storage.from(BUCKET_NAME).getPublicUrl(name);
    if (data?.publicUrl) {
      navigator.clipboard.writeText(data.publicUrl);
      setCopiedId(name);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const formatSize = (bytes?: number) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isImageFile = (name: string) => {
    const ext = name.split('.').pop()?.toLowerCase() || '';
    return ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(ext);
  };

  const getPublicFileUrl = (name: string) => {
    if (!client) return '';
    return client.storage.from(BUCKET_NAME).getPublicUrl(name).data.publicUrl || '';
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-black/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl border-t-4 border-brand-gold overflow-hidden"
        >
          {/* Header */}
          <div className="bg-brand-black text-white p-6 flex justify-between items-center border-b border-white/5">
            <div className="flex items-center space-x-3">
              <Database className="w-5 h-5 text-brand-gold" />
              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.2em]">Gestor de Arquivos</h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">Bucket Supabase: {BUCKET_NAME}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white p-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            {/* Status alerts */}
            {error && (
              <div className="bg-red-50 text-red-800 p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
                <div className="text-xs font-light">
                  <p className="font-semibold uppercase tracking-widest mb-1 text-[10px]">Aviso / Instrução</p>
                  <p className="leading-relaxed">{error}</p>
                  <p className="mt-2 text-[10px] text-red-600 font-semibold uppercase tracking-wider">
                    Dica: Crie uma conta gratuita em Supabase.com, adicione as chaves VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no menu de Secrets e crie o bucket "{BUCKET_NAME}" como público.
                  </p>
                </div>
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-green-800 p-4 flex items-center space-x-3">
                <Check className="w-5 h-5 shrink-0 text-green-500" />
                <span className="text-xs font-light">{success}</span>
              </div>
            )}

            {/* Connection Status & Guide */}
            {!client && (
              <div className="border border-dashed border-gray-200 p-6 text-center space-y-4">
                <Database className="w-10 h-10 text-gray-300 mx-auto" />
                <div className="max-w-md mx-auto space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest">Configuração do Banco de Dados</h4>
                  <p className="text-xs text-gray-500 font-light leading-relaxed">
                    Sua aplicação está pronta para conectar ao Supabase! Defina as variáveis de ambiente em seu painel do AI Studio:
                  </p>
                  <div className="bg-gray-50 p-3 text-left font-mono text-[10px] text-gray-600 space-y-1 block select-all">
                    <div>VITE_SUPABASE_URL=https://seuid.supabase.co</div>
                    <div>VITE_SUPABASE_ANON_KEY=sua-chave-anon</div>
                    <div>VITE_SUPABASE_BUCKET=ProjetoCerto</div>
                  </div>
                </div>
              </div>
            )}

            {client && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left side: Upload Area */}
                <div className="md:col-span-1 space-y-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">Upload de Arquivos</h4>
                  
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed p-8 text-center flex flex-col items-center justify-center min-h-[220px] transition-colors cursor-pointer relative ${
                      dragActive ? 'border-brand-gold bg-brand-gold/5' : 'border-gray-200 hover:border-brand-gold bg-gray-50'
                    }`}
                  >
                    <input
                      type="file"
                      id="supabase-file-upload"
                      className="hidden"
                      onChange={handleFileInput}
                      disabled={uploading}
                    />
                    <label htmlFor="supabase-file-upload" className="cursor-pointer flex flex-col items-center h-full w-full justify-center">
                      {uploading ? (
                        <>
                          <RefreshCw className="w-10 h-10 text-brand-gold animate-spin mb-4" />
                          <span className="text-xs font-medium text-brand-black">Carregando arquivo...</span>
                          <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Aguarde</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-10 h-10 text-gray-400 mb-4 group-hover:text-brand-gold" />
                          <span className="text-xs font-bold uppercase tracking-widest text-brand-black mb-1">Arrastar e Soltar</span>
                          <span className="text-[10px] text-gray-400 font-light max-w-[150px] leading-relaxed mx-auto">
                            ou clique para selecionar do seu dispositivo
                          </span>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                {/* Right side: File List */}
                <div className="md:col-span-2 space-y-6">
                  <div className="flex justify-between items-center">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">Arquivos no Banco</h4>
                    <button
                      onClick={fetchFiles}
                      disabled={loading}
                      className="text-xs flex items-center space-x-1 text-gray-400 hover:text-brand-black uppercase tracking-widest"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                      <span>Atualizar</span>
                    </button>
                  </div>

                  {loading ? (
                    <div className="py-12 text-center text-xs text-gray-400 font-light">
                      Carregando arquivos...
                    </div>
                  ) : files.length === 0 ? (
                    <div className="py-12 border border-dashed border-gray-100 text-center text-xs text-gray-400 font-light">
                      Nenhum arquivo encontrado no bucket "{BUCKET_NAME}".
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100 border border-gray-100 max-h-[350px] overflow-y-auto">
                      {files.map((file) => {
                        const isImg = isImageFile(file.name);
                        const fileUrl = getPublicFileUrl(file.name);
                        
                        return (
                          <div key={file.id || file.name} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                            <div className="flex items-center space-x-4 min-w-0 flex-1 mr-4">
                              {isImg ? (
                                <div className="w-10 h-10 bg-gray-100 flex-shrink-0 overflow-hidden relative">
                                  <img src={fileUrl} alt={file.name} className="w-full h-full object-cover" />
                                </div>
                              ) : (
                                <div className="w-10 h-10 bg-gray-100 flex items-center justify-center flex-shrink-0 text-brand-gold">
                                  <File className="w-5 h-5" />
                                </div>
                              )}
                              <div className="min-w-0 flex-1">
                                <p className="text-xs font-medium text-brand-black truncate">{file.name}</p>
                                <p className="text-[10px] text-gray-400 font-light uppercase tracking-wider mt-0.5">
                                  {formatSize(file.metadata?.size)} • {new Date(file.created_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              {/* View / Link button */}
                              <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-gray-400 hover:text-brand-gold transition-colors"
                                title="Visualizar arquivo"
                              >
                                <Link className="w-4 h-4" />
                              </a>

                              {/* Copy Link button */}
                              <button
                                onClick={() => copyUrl(file.name)}
                                className="p-2 text-gray-400 hover:text-brand-gold transition-colors relative"
                                title="Copiar URL"
                              >
                                {copiedId === file.name ? (
                                  <Check className="w-4 h-4 text-green-500 animate-pulse" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </button>

                              {/* Delete button */}
                              <button
                                onClick={() => handleDelete(file.name)}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                title="Deletar"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 p-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light text-gray-500">
            <span>Copie as URLs públicas dos arquivos carregados para utilizá-los em novos produtos, projetos ou documentos.</span>
            <button
              onClick={onClose}
              className="bg-brand-black text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-brand-gold transition-colors w-full md:w-auto"
            >
              Fechar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
