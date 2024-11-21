import React from 'react';
import { Users, BriefcaseIcon, MessageSquare, TrendingUp } from 'lucide-react';
import useStatsStore from '../../store/statsStore';
import useMessagesStore from '../../store/messagesStore';
import useApplicationsStore from '../../store/applicationsStore';

export default function AdminDashboard() {
  const stats = useStatsStore();
  const { messages } = useMessagesStore();
  const { applications } = useApplicationsStore();

  const unreadMessages = messages.filter(msg => !msg.read).length;
  const pendingApplications = applications.filter(app => app.status === 'pending').length;

  const statsData = [
    {
      name: 'Total Applications',
      value: applications.length.toString(),
      icon: BriefcaseIcon,
      change: '+12%',
      changeType: 'increase',
    },
    {
      name: 'New Messages',
      value: unreadMessages.toString(),
      icon: MessageSquare,
      change: '+4%',
      changeType: 'increase',
    },
    {
      name: 'Active Jobs',
      value: '12',
      icon: Users,
      change: '0%',
      changeType: 'neutral',
    },
    {
      name: 'Conversion Rate',
      value: '24.57%',
      icon: TrendingUp,
      change: '+2.5%',
      changeType: 'increase',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((item) => (
          <div
            key={item.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <item.icon
                    className="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {item.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {item.value}
                      </div>
                      <div
                        className={`ml-2 flex items-baseline text-sm font-semibold ${
                          item.changeType === 'increase'
                            ? 'text-green-600'
                            : item.changeType === 'decrease'
                            ? 'text-red-600'
                            : 'text-gray-500'
                        }`}
                      >
                        {item.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recent Activity
          </h3>
          <div className="mt-4">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {applications.slice(0, 3).map((application) => (
                  <li key={application.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <Users className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          New application received
                        </p>
                        <p className="text-sm text-gray-500">
                          {application.firstName} {application.lastName} applied for {application.position} position
                        </p>
                      </div>
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          New
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}