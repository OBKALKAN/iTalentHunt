import React, { useState } from 'react';
import { Plus, ChevronDown, ChevronUp } from 'lucide-react';
import useApplicationsStore, { ApplicationStatus } from '../../store/applicationsStore';
import ApplicationStatusModal from './ApplicationStatusModal';
import NewApplicationModal from './NewApplicationModal';

const statusLabels: Record<ApplicationStatus, string> = {
  new: 'New',
  accepted: 'Accepted',
  rejected: 'Rejected',
  first_meeting: 'First Meeting',
  second_meeting: 'Second Meeting',
  third_meeting: 'Third Meeting',
  fourth_meeting: 'Fourth Meeting',
  allianz_meeting: 'Allianz Meeting',
};

const statusColors: Record<ApplicationStatus, { bg: string; text: string }> = {
  new: { bg: 'bg-blue-100', text: 'text-blue-800' },
  accepted: { bg: 'bg-green-100', text: 'text-green-800' },
  rejected: { bg: 'bg-red-100', text: 'text-red-800' },
  first_meeting: { bg: 'bg-purple-100', text: 'text-purple-800' },
  second_meeting: { bg: 'bg-purple-100', text: 'text-purple-800' },
  third_meeting: { bg: 'bg-purple-100', text: 'text-purple-800' },
  fourth_meeting: { bg: 'bg-purple-100', text: 'text-purple-800' },
  allianz_meeting: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
};

export default function AdminApplications() {
  const { applications } = useApplicationsStore();
  const [selectedApplication, setSelectedApplication] = useState<number | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>('all');
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const filteredApplications = applications.filter(
    (app) => statusFilter === 'all' || app.currentStatus === statusFilter
  );

  const toggleExpand = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Job Applications</h1>
        <button
          onClick={() => setShowNewModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={20} />
          Add Application
        </button>
      </div>

      <div className="mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus | 'all')}
          className="mt-1 block w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          {Object.entries(statusLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expand
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Status
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((application) => (
                <React.Fragment key={application.id}>
                  <tr>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleExpand(application.id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {expandedRows.includes(application.id) ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {application.firstName} {application.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{application.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {application.position}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          statusColors[application.currentStatus].bg
                        } ${statusColors[application.currentStatus].text}`}
                      >
                        {statusLabels[application.currentStatus]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(application.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedApplication(application.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Update Status
                      </button>
                    </td>
                  </tr>
                  {expandedRows.includes(application.id) && (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 bg-gray-50">
                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-900">Status History</h4>
                          <div className="space-y-2">
                            {application.statusHistory.map((update) => (
                              <div
                                key={update.id}
                                className="flex items-start gap-4 text-sm"
                              >
                                <div className="w-32 flex-shrink-0">
                                  <span
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      statusColors[update.status].bg
                                    } ${statusColors[update.status].text}`}
                                  >
                                    {statusLabels[update.status]}
                                  </span>
                                </div>
                                <div className="flex-grow">
                                  <p className="text-gray-900">{update.comment}</p>
                                  <p className="text-gray-500 text-xs">
                                    {new Date(update.date).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedApplication && (
        <ApplicationStatusModal
          applicationId={selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      )}

      {showNewModal && (
        <NewApplicationModal onClose={() => setShowNewModal(false)} />
      )}
    </div>
  );
}