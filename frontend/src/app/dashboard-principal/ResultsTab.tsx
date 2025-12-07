'use client';
import React, { useState, useEffect } from 'react';
import { Eye, Trash2, Plus, FileText, Loader2, Filter, X } from 'lucide-react';
import ResultModal from './ResultModal';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';

type Result = {
  _id: string;
  studentId: string | { _id: string; fullName: string; className: string; phone: string };
  studentName: string;
  className: string;
  exam: string;
  grade: string;
  marks?: number;
  subject?: string;
  remarks?: string;
  examDate?: string;
  createdAt?: string;
};

// Helper function to get grade colors
const getGradeColor = (grade: string): string => {
  const gradeColors: Record<string, string> = {
    'A+': 'bg-green-100 text-green-800',
    'A': 'bg-green-100 text-green-700',
    'A-': 'bg-green-100 text-green-600',
    'B+': 'bg-blue-100 text-blue-700',
    'B': 'bg-blue-100 text-blue-600',
    'B-': 'bg-blue-100 text-blue-500',
    'C+': 'bg-yellow-100 text-yellow-700',
    'C': 'bg-yellow-100 text-yellow-600',
    'C-': 'bg-orange-100 text-orange-600',
    'D': 'bg-red-100 text-red-600',
    'F': 'bg-red-100 text-red-700'
  };
  return gradeColors[grade] || 'bg-gray-100 text-gray-600';
};

const classLabels: Record<string, string> = {
  'madani-first': 'মাদানি নেসাব প্রথম বর্ষ',
  'madani-second': 'মাদানি নেসাব দ্বিতীয় বর্ষ',
  'hifz-beginner': 'হিফজ (প্রাথমিক)',
  'hifz-intermediate': 'হিফজ (মাধ্যমিক)',
  'hifz-advanced': 'হিফজ (উন্নত)',
  'nazera': 'নাজেরা',
  'qaida': 'কায়দা'
};

const ResultsTab = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  
  // Filter states
  const [filterClass, setFilterClass] = useState('');
  const [filterExam, setFilterExam] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    fetchResults();
  }, [currentPage, filterClass, filterExam]);

  const fetchResults = async () => {
    try {
      setLoading(true);
      const params: any = {
        page: currentPage,
        limit: 10,
        sortBy: 'createdAt',
        sortOrder: 'desc'
      };
      
      if (filterClass) params.className = filterClass;
      if (filterExam) params.exam = filterExam;

      const response = await api.get('/results', { params });
      
      setResults(response.data.data || []);
      setTotalPages(response.data.pagination?.totalPages || 1);
      setTotalResults(response.data.pagination?.totalResults || 0);
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError.response?.data?.message || 'ফলাফল লোড করতে ব্যর্থ');
      console.error('Error fetching results:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('আপনি কি এই ফলাফলটি মুছে ফেলতে চান?')) {
      return;
    }

    try {
      setDeleting(id);
      await api.delete(`/results/${id}`);
      toast.success('ফলাফল সফলভাবে মুছে ফেলা হয়েছে');
      fetchResults();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError.response?.data?.message || 'মুছে ফেলতে ব্যর্থ');
      console.error('Error deleting result:', error);
    } finally {
      setDeleting(null);
    }
  };

  const handleAddResult = async (
    studentId: string,
    studentName: string,
    className: string,
    exam: string,
    grade: string
  ) => {
    try {
      const response = await api.post('/results', {
        studentId,
        exam,
        grade
      });
      
      if (response.data.success) {
        toast.success('ফলাফল সফলভাবে যুক্ত হয়েছে');
        setShowModal(false);
        fetchResults();
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError.response?.data?.message || 'ফলাফল যুক্ত করতে ব্যর্থ');
      console.error('Error adding result:', error);
    }
  };

  const clearFilters = () => {
    setFilterClass('');
    setFilterExam('');
    setCurrentPage(1);
  };

  // Helper function to get student ID string
  const getStudentIdString = (studentId: string | { _id: string }): string => {
    if (typeof studentId === 'string') {
      return studentId;
    }
    return studentId._id || '';
  };

  const hasActiveFilters = filterClass || filterExam;

  if (loading && results.length === 0) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">ফলাফল তালিকা</h3>
              <p className="text-green-100 text-sm">সকল ছাত্র-ছাত্রীদের পরীক্ষার ফলাফল</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-white text-green-600 px-4 py-3 rounded-lg hover:bg-green-50 transition-all duration-200 shadow-md font-medium flex items-center"
              >
                <Filter className="w-5 h-5 mr-2" />
                ফিল্টার {hasActiveFilters && `(${(filterClass ? 1 : 0) + (filterExam ? 1 : 0)})`}
              </button>
              <button
                className="bg-white text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-all duration-200 shadow-md font-medium flex items-center"
                onClick={() => setShowModal(true)}
              >
                <Plus className="w-5 h-5 mr-2" />
                ফলাফল যোগ করুন
              </button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 bg-white rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ক্লাস</label>
                  <select
                    value={filterClass}
                    onChange={(e) => {
                      setFilterClass(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">সকল ক্লাস</option>
                    {Object.entries(classLabels).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">পরীক্ষা</label>
                  <input
                    type="text"
                    value={filterExam}
                    onChange={(e) => {
                      setFilterExam(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="পরীক্ষার নাম"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="flex items-end">
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                    >
                      <X className="w-4 h-4 mr-2" />
                      ফিল্টার মুছুন
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-8">
          {results.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <FileText className="w-12 h-12 text-gray-400" />
              </div>
              <h4 className="text-xl font-semibold text-gray-600 mb-2">কোনো ফলাফল পাওয়া যায়নি</h4>
              <p className="text-gray-500 mb-6">
                {hasActiveFilters ? 'এই ফিল্টারে কোনো ফলাফল নেই' : 'নতুন ফলাফল যোগ করতে উপরের বাটনে ক্লিক করুন'}
              </p>
              {!hasActiveFilters && (
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  প্রথম ফলাফল যোগ করুন
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-8 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        ছাত্র/ছাত্রী
                      </th>
                      <th className="px-8 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        ক্লাস
                      </th>
                      <th className="px-8 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        পরীক্ষা
                      </th>
                      <th className="px-8 py-5 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        ফলাফল
                      </th>
                      <th className="px-8 py-5 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        কার্যক্রম
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {results.map((result, index) => {
                      const studentIdStr = getStudentIdString(result.studentId);
                      return (
                        <tr 
                          key={result._id} 
                          className={`hover:bg-gray-50 transition-colors duration-150 ${
                            index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                          }`}
                        >
                          <td className="px-8 py-6 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                <span className="text-blue-600 font-semibold text-sm">
                                  {result.studentName?.charAt(0) || 'ছ'}
                                </span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {result.studentName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  আইডি: {studentIdStr.slice(-8) || 'N/A'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 whitespace-nowrap">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                              {classLabels[result.className] || result.className}
                            </span>
                          </td>
                          <td className="px-8 py-6 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{result.exam}</div>
                            {result.subject && (
                              <div className="text-sm text-gray-500">{result.subject}</div>
                            )}
                          </td>
                          <td className="px-8 py-6 whitespace-nowrap text-center">
                            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                              getGradeColor(result.grade)
                            }`}>
                              {result.grade}
                            </span>
                            {result.marks !== undefined && (
                              <div className="text-xs text-gray-500 mt-1">{result.marks}%</div>
                            )}
                          </td>
                          <td className="px-8 py-6 whitespace-nowrap text-center">
                            <div className="flex justify-center space-x-3">
                              <button
                                className="p-3 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
                                title="মুছে ফেলুন"
                                onClick={() => handleDelete(result._id)}
                                disabled={deleting === result._id}
                              >
                                {deleting === result._id ? (
                                  <Loader2 size={18} className="animate-spin" />
                                ) : (
                                  <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Statistics and Footer */}
          {results.length > 0 && (
            <div className="mt-8 space-y-4">
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{totalResults}</div>
                  <div className="text-sm text-blue-600">মোট ফলাফল</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {results.filter(r => ['A+', 'A', 'A-'].includes(r.grade)).length}
                  </div>
                  <div className="text-sm text-green-600">উত্তীর্ণ</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {results.filter(r => ['B+', 'B', 'B-'].includes(r.grade)).length}
                  </div>
                  <div className="text-sm text-yellow-600">গড় ফলাফল</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {results.filter(r => ['C+', 'C', 'C-', 'D', 'F'].includes(r.grade)).length}
                  </div>
                  <div className="text-sm text-red-600">উন্নতি প্রয়োজন</div>
                </div>
              </div>
              
              {/* Pagination */}
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-sm text-gray-600">
                  মোট {totalResults} টি ফলাফল (পৃষ্ঠা {currentPage} এর {totalPages})
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    পূর্ববর্তী
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    পরবর্তী
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <ResultModal onClose={() => setShowModal(false)} onSubmit={handleAddResult} />
      )}
    </div>
  );
};

export default ResultsTab;