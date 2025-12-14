import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronDown, ChevronRight } from 'lucide-react';
import { faqData } from '../data/courseData';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="py-12 px-6">
      <div className="max-w-[800px] mx-auto">
        <Link to="/resources" className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-6">
          <ChevronLeft className="w-4 h-4" /> Resources
        </Link>

        <div className="mb-12">
          <h1 className="text-h1 text-neutral-900 dark:text-white mb-4">FAQ</h1>
          <p className="text-body-lg text-neutral-500 dark:text-neutral-400">
            Frequently asked questions about the course.
          </p>
        </div>

        <div className="space-y-3">
          {faqData.map((item, index) => (
            <div key={index} className="bg-surface dark:bg-neutral-800 rounded-xl shadow-card overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <h3 className="font-semibold text-neutral-900 dark:text-white pr-4">{item.question}</h3>
                {openIndex === index ? (
                  <ChevronDown className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-neutral-500 dark:text-neutral-400">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
