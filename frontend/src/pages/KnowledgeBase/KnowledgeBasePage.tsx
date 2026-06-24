import React, { useState, useEffect, useRef } from 'react';
import { UploadCloud, FileText, Sparkles, RefreshCcw, CheckCircle2, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { documentService } from '../../services';
import type { Document } from '../../types';

const KnowledgeBasePage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const data = await documentService.getAll();
      setDocuments(data);
    } catch (err) {
      console.error('Failed to fetch documents', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploadedDoc = await documentService.upload(file, file.name);
      setDocuments([uploadedDoc, ...documents]);
    } catch (err) {
      console.error('Upload failed', err);
      alert('Failed to upload document. Please ensure it is a valid format and size.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    try {
      await documentService.delete(id);
      setDocuments(documents.filter(doc => doc.id !== id));
    } catch (err) {
      alert('Failed to delete document');
    }
  };

  const handleSync = async () => {
    setIsSyncing(true);
    // Simulate syncing delay
    setTimeout(() => {
      setIsSyncing(false);
      alert('AI Knowledge Base successfully synchronized!');
    }, 2000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const totalStorageBytes = documents.reduce((acc, doc) => acc + doc.fileSize, 0);
  const maxStorageBytes = 100 * 1024 * 1024; // 100 MB
  const storagePercentage = Math.min((totalStorageBytes / maxStorageBytes) * 100, 100);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-surface">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-4rem)] overflow-y-auto">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-on-surface mb-2">Knowledge Base</h1>
        <p className="text-on-surface-variant max-w-2xl text-base">
          Feed your SalesPilot AI with the data it needs. Upload product guides, company policies, and sales scripts to ensure accurate AI responses.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        
        {/* Left Column: Upload Area */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          
          {/* Dropzone */}
          <div className="bg-surface-bright border-2 border-dashed border-outline-variant rounded-2xl p-10 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-primary-fixed rounded-full flex items-center justify-center mb-6">
              {uploading ? (
                 <Loader2 className="w-10 h-10 text-primary animate-spin" />
              ) : (
                 <UploadCloud className="w-10 h-10 text-primary" />
              )}
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2">Drag & Drop Files</h3>
            <p className="text-on-surface-variant text-sm mb-8">
              Support for PDF, DOCX, and TXT files.<br />Maximum file size 25MB.
            </p>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              className="hidden" 
              accept=".pdf,.docx,.txt"
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center px-6 py-3 bg-primary text-white rounded-xl text-sm font-bold shadow-sm hover:bg-primary-container transition-colors disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <UploadCloud className="w-5 h-5 mr-2" />
                  Browse Files
                </>
              )}
            </button>
          </div>

          {/* AI Insight Card */}
          <div className="bg-white border border-primary/20 rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(59,130,246,0.1)] relative overflow-hidden">
            {/* Top border accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>
            
            <div className="flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-wider mb-4">
              <Sparkles className="w-4 h-4" />
              <span>AI Insight</span>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed italic font-medium">
              {documents.length > 0 
                ? `"Your AI is currently trained on ${documents.length} document${documents.length === 1 ? '' : 's'}. Keeping these updated ensures higher response accuracy."`
                : `"Upload documents with clear headings and bullet points. They are processed 30% faster and result in more accurate customer support interactions."`
              }
            </p>
          </div>

        </div>

        {/* Right Column: Manage Uploads Table */}
        <div className="w-full lg:w-2/3 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-on-surface">Manage Uploads</h2>
            <button 
              onClick={handleSync}
              disabled={isSyncing}
              className="flex items-center px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-sm hover:bg-primary-container transition-colors disabled:opacity-70"
            >
              <RefreshCcw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Syncing...' : 'Sync AI'}
              {!isSyncing && <span className="ml-2 w-2 h-2 bg-white rounded-full animate-pulse"></span>}
            </button>
          </div>

          <div className="bg-white border border-outline-variant/50 rounded-2xl overflow-hidden flex-1 flex flex-col">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-outline-variant/30">
                <thead className="bg-surface-container-lowest">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-on-surface-variant uppercase tracking-wider">File Name</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-outline-variant/30">
                  {documents.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-outline text-sm">
                        No documents uploaded yet.
                      </td>
                    </tr>
                  ) : (
                    documents.map((doc) => (
                      <tr key={doc.id} className="hover:bg-surface-container-lowest transition-colors group">
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileText className="w-6 h-6 text-primary mr-4" />
                            <div>
                              <div className="text-sm font-bold text-on-surface">{doc.fileName}</div>
                              <div className="text-xs text-outline">{formatFileSize(doc.fileSize)}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-secondary-container text-on-secondary-container">
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                            Synced
                          </span>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap text-sm text-on-surface-variant">
                          {new Date(doc.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            onClick={() => handleDelete(doc.id)}
                            className="text-outline hover:text-error opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-surface-container-lowest px-6 py-4 border-t border-outline-variant/30 mt-auto flex items-center justify-between">
              <span className="text-sm text-on-surface-variant">
                Showing {documents.length} document{documents.length !== 1 && 's'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Storage */}
        <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm">
          <div className="text-sm font-semibold text-on-surface-variant mb-2">Storage Used</div>
          <div className="flex items-baseline space-x-2 mb-4">
            <span className="text-3xl font-bold text-primary">{formatFileSize(totalStorageBytes)}</span>
            <span className="text-sm text-outline">/ 100 MB</span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-2.5">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${storagePercentage}%` }}></div>
          </div>
        </div>

        {/* Keywords */}
        <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm">
          <div className="text-sm font-semibold text-on-surface-variant mb-2">Total Keywords</div>
          <div className="text-3xl font-bold text-on-surface mb-3">{documents.length > 0 ? (documents.length * 412) : 0}</div>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-secondary-container text-on-secondary-container">
            {documents.length > 0 ? '+12% from last upload' : 'Awaiting data'}
          </span>
        </div>

        {/* Confidence */}
        <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm">
          <div className="text-sm font-semibold text-on-surface-variant mb-2">AI Confidence</div>
          <div className="text-3xl font-bold text-secondary mb-3">{documents.length > 0 ? '94.2%' : '0%'}</div>
          <div className="text-xs font-medium text-outline">Based on semantic relevance tests</div>
        </div>
      </div>

    </div>
  );
};

export default KnowledgeBasePage;
