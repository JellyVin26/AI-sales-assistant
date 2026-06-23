import React from 'react';
import { UploadCloud, FileText, Sparkles, RefreshCcw, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  size: string;
  status: 'Synced' | 'Processing';
  date: string;
}

const mockDocuments: Document[] = [
  { id: '1', name: 'Product_Catalogue_2024.pdf', size: '1.2 MB', status: 'Synced', date: 'Oct 24, 2023' },
  { id: '2', name: 'Sales_Scripts_v2.docx', size: '450 KB', status: 'Processing', date: 'Oct 26, 2023' },
  { id: '3', name: 'Company_FAQ.txt', size: '12 KB', status: 'Synced', date: 'Oct 20, 2023' },
  { id: '4', name: 'Holiday_Returns_Policy.pdf', size: '2.1 MB', status: 'Synced', date: 'Oct 15, 2023' },
];

const KnowledgeBasePage: React.FC = () => {
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
              <UploadCloud className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2">Drag & Drop Files</h3>
            <p className="text-on-surface-variant text-sm mb-8">
              Support for PDF, DOCX, and TXT files.<br />Maximum file size 25MB.
            </p>
            <button className="flex items-center px-6 py-3 bg-primary text-white rounded-xl text-sm font-bold shadow-sm hover:bg-primary-container transition-colors">
              <UploadCloud className="w-5 h-5 mr-2" />
              Browse Files
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
              "Documents with clear headings and bullet points are processed 30% faster and result in more accurate customer support interactions."
            </p>
          </div>

        </div>

        {/* Right Column: Manage Uploads Table */}
        <div className="w-full lg:w-2/3 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-on-surface">Manage Uploads</h2>
            <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-sm hover:bg-primary-container transition-colors">
              <RefreshCcw className="w-4 h-4 mr-2" />
              Sync AI
              <span className="ml-2 w-2 h-2 bg-white rounded-full animate-pulse"></span>
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
                  {mockDocuments.map((doc) => (
                    <tr key={doc.id} className="hover:bg-surface-container-lowest transition-colors group">
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileText className="w-6 h-6 text-primary mr-4" />
                          <div>
                            <div className="text-sm font-bold text-on-surface">{doc.name}</div>
                            <div className="text-xs text-outline">{doc.size}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        {doc.status === 'Synced' ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-secondary-container text-on-secondary-container">
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                            Synced
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-primary-fixed text-on-primary-fixed-variant">
                            <RefreshCcw className="w-3.5 h-3.5 mr-1 animate-spin" />
                            Processing
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm text-on-surface-variant">
                        {doc.date}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-outline hover:text-error opacity-0 group-hover:opacity-100 transition-opacity">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-surface-container-lowest px-6 py-4 border-t border-outline-variant/30 mt-auto flex items-center justify-between">
              <span className="text-sm text-on-surface-variant">
                Showing 4 of 12 documents
              </span>
              <div className="flex space-x-2">
                <button className="p-1.5 rounded-lg border border-outline-variant/50 text-outline hover:bg-surface-container transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="p-1.5 rounded-lg border border-outline-variant/50 text-outline hover:bg-surface-container transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
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
            <span className="text-3xl font-bold text-primary">3.8 MB</span>
            <span className="text-sm text-outline">/ 100 MB</span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-2.5">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: '3.8%' }}></div>
          </div>
        </div>

        {/* Keywords */}
        <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm">
          <div className="text-sm font-semibold text-on-surface-variant mb-2">Total Keywords</div>
          <div className="text-3xl font-bold text-on-surface mb-3">1,248</div>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-secondary-container text-on-secondary-container">
            +12% from last upload
          </span>
        </div>

        {/* Confidence */}
        <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm">
          <div className="text-sm font-semibold text-on-surface-variant mb-2">AI Confidence</div>
          <div className="text-3xl font-bold text-secondary mb-3">94.2%</div>
          <div className="text-xs font-medium text-outline">Based on semantic relevance tests</div>
        </div>
      </div>

    </div>
  );
};

export default KnowledgeBasePage;
