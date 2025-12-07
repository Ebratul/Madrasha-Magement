"use client";
import React, { useState, useMemo } from "react";
import { Eye, Trash2, Plus, RefreshCcw } from "lucide-react";
import { toast } from "react-hot-toast";
import StudentModal, { StudentRecord } from "./StudentModal";

interface StudentsTabProps {
  students: StudentRecord[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  onStudentCreated: (student: StudentRecord) => void;
  onDeleteStudent: (id: string) => Promise<void>;
}

const StudentsTab = ({
  students,
  loading,
  error,
  refresh,
  onStudentCreated,
  onDeleteStudent,
}: StudentsTabProps) => {
  const [showModal, setShowModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>("all");

  const classes = [
    { value: "all", label: "সকল ক্লাস", bnLabel: "সকল ক্লাস" },
    { value: "madani-first", label: "মাদানি নেসাব প্রথম বর্ষ", bnLabel: "মাদানি নেসাব প্রথম বর্ষ" },
    { value: "madani-second", label: "মাদানি নেসাব দ্বিতীয় বর্ষ", bnLabel: "মাদানি নেসাব দ্বিতীয় বর্ষ" },
    { value: "hifz-beginner", label: "হিফজ (প্রাথমিক)", bnLabel: "হিফজ (প্রাথমিক)" },
    { value: "hifz-intermediate", label: "হিফজ (মাধ্যমিক)", bnLabel: "হিফজ (মাধ্যমিক)" },
    { value: "hifz-advanced", label: "হিফজ (উন্নত)", bnLabel: "হিফজ (উন্নত)" },
    { value: "nazera", label: "নাজেরা", bnLabel: "নাজেরা" },
    { value: "qaida", label: "কায়দা", bnLabel: "কায়দা" }
  ];

  // Filter students by selected class
  const filteredStudents = useMemo(() => {
    if (selectedClass === "all") {
      return students;
    }
    return students.filter(student => student.className === selectedClass);
  }, [students, selectedClass]);

  // Get student count per class
  const getClassCount = (classValue: string) => {
    if (classValue === "all") return students.length;
    return students.filter(s => s.className === classValue).length;
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await refresh();
      toast.success("ডেটা রিফ্রেশ হয়েছে");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "ডেটা রিফ্রেশ করতে ব্যর্থ হয়েছে";
      toast.error(message);
    } finally {
      setRefreshing(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("আপনি কি এই ছাত্র/ছাত্রীটি মুছে ফেলতে চান?")) {
      return;
    }
    try {
      setDeletingId(id);
      await onDeleteStudent(id);
      toast.success("শিক্ষার্থী সফলভাবে মুছে ফেলা হয়েছে");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "মুছে ফেলতে ব্যর্থ হয়েছে";
      toast.error(message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="text-xl font-semibold text-gray-800">ছাত্র-ছাত্রী তালিকা</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={refreshing || loading}
              className={`px-4 py-2 rounded-lg flex items-center border border-green-600 text-green-700 hover:bg-green-50 transition-colors ${
                refreshing || loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              <RefreshCcw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
              রিফ্রেশ
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              নতুন ছাত্র/ছাত্রী
            </button>
          </div>
        </div>

        {/* Class Filter Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex flex-wrap gap-2 -mb-px">
            {classes.map((cls) => (
              <button
                key={cls.value}
                onClick={() => setSelectedClass(cls.value)}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  selectedClass === cls.value
                    ? "border-green-600 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {cls.bnLabel}
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                  {getClassCount(cls.value)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : filteredStudents.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">
              {selectedClass === "all" 
                ? "কোনো ছাত্র/ছাত্রী পাওয়া যায়নি" 
                : "এই ক্লাসে কোনো ছাত্র/ছাত্রী নেই"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">নাম</th>
                  <th className="px-6 py-3">পিতার নাম</th>
                  <th className="px-6 py-3">ক্লাস</th>
                  <th className="px-6 py-3">মোবাইল</th>
                  <th className="px-6 py-3">কার্যক্রম</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((st) => (
                  <tr key={st._id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{st.fullName}</td>
                    <td className="px-6 py-4">{st.fatherName}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        {classes.find(c => c.value === st.className)?.bnLabel || st.className}
                      </span>
                    </td>
                    <td className="px-6 py-4">{st.phone}</td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="বিস্তারিত দেখুন"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 disabled:opacity-50 transition-colors"
                        onClick={() => handleDelete(st._id)}
                        disabled={deletingId === st._id}
                        title="মুছে ফেলুন"
                      >
                        {deletingId === st._id ? (
                          <div className="h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Summary */}
        {!loading && !error && filteredStudents.length > 0 && (
          <div className="mt-4 text-sm text-gray-600 text-right">
            মোট {filteredStudents.length} জন শিক্ষার্থী
          </div>
        )}
      </div>

      {showModal && (
        <StudentModal
          onClose={() => setShowModal(false)}
          onSuccess={(student) => {
            onStudentCreated(student);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default StudentsTab;