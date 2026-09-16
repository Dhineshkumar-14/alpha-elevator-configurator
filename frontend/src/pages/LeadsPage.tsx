import {
  ArrowUpRight,
  Calendar,
  ChevronDown,
  Eye,
  Filter,
  MoreHorizontal,
  Phone,
  Plus,
  UserPlus,
} from "lucide-react";

const leads = [
  {
    id: "LD-1024",
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    location: "Chennai",
    source: "Website",
    requirement: "Home Elevator",
    status: "New",
    assignedTo: "Arun Kumar",
    date: "12 Sep 2026",
  },
  {
    id: "LD-1023",
    name: "Priya Homes",
    phone: "+91 98402 12345",
    location: "Coimbatore",
    source: "Referral",
    requirement: "Villa Elevator",
    status: "Follow Up",
    assignedTo: "Arun Kumar",
    date: "11 Sep 2026",
  },
  {
    id: "LD-1022",
    name: "Suresh Builders",
    phone: "+91 99876 54321",
    location: "Chennai",
    source: "Instagram",
    requirement: "Home Elevator",
    status: "Quoted",
    assignedTo: "Karthik",
    date: "10 Sep 2026",
  },
  {
    id: "LD-1021",
    name: "Anand Residence",
    phone: "+91 97910 11223",
    location: "Bangalore",
    source: "Website",
    requirement: "Residential Lift",
    status: "Converted",
    assignedTo: "Arun Kumar",
    date: "09 Sep 2026",
  },
  {
    id: "LD-1020",
    name: "Vijay Constructions",
    phone: "+91 98844 77889",
    location: "Chennai",
    source: "Referral",
    requirement: "Home Elevator",
    status: "Lost",
    assignedTo: "Karthik",
    date: "08 Sep 2026",
  },
];

const statusStyles: Record<string, string> = {
  New: "bg-primary/10 text-primary",
  "Follow Up": "bg-yellow-500/10 text-yellow-400",
  Quoted: "bg-blue-500/10 text-blue-400",
  Converted: "bg-green-500/10 text-green-400",
  Lost: "bg-red-500/10 text-red-400",
};

const LeadsPage = () => {
  return (
    <div className="min-h-full bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-text-primary sm:text-2xl">
              Leads
            </h1>

            <p className="mt-1 text-sm text-text-muted">
              Manage your sales leads and follow-ups.
            </p>
          </div>

          <button
            type="button"
            className="
              inline-flex items-center justify-center gap-2
              rounded-lg
              bg-primary
              px-4 py-2.5
              text-sm font-medium
              text-white
              transition
              hover:opacity-90
              sm:w-auto
            "
          >
            <Plus size={17} />
            Add Lead
          </button>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          <StatCard
            label="Total Leads"
            value="128"
            change="+12.5%"
            icon={<UserPlus size={18} />}
          />

          <StatCard
            label="New Leads"
            value="24"
            change="+8.2%"
            icon={<ArrowUpRight size={18} />}
          />

          <StatCard
            label="Follow-ups"
            value="18"
            change="Today"
            icon={<Calendar size={18} />}
          />

          <StatCard
            label="Converted"
            value="32"
            change="25%"
            icon={<ArrowUpRight size={18} />}
          />
        </div>

        {/* FILTER BAR */}
        <div
          className="
            flex flex-col gap-3
            rounded-xl
            border border-border
            bg-surface
            p-3
            sm:flex-row sm:items-center sm:justify-between
          "
        >
          <div className="flex items-center gap-2">
            <Filter size={17} className="text-text-muted" />

            <span className="text-sm font-medium text-text-primary">
              Filters
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:flex">
            <FilterButton label="Status" />
            <FilterButton label="Source" />
            <FilterButton label="Salesperson" />
            <FilterButton label="Date" icon={<Calendar size={14} />} />
          </div>
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden overflow-hidden rounded-xl border border-border bg-surface md:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-5 py-3.5 text-left">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-text-muted">
                      Lead
                    </span>
                  </th>

                  <th className="px-5 py-3.5 text-left">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-text-muted">
                      Requirement
                    </span>
                  </th>

                  <th className="px-5 py-3.5 text-left">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-text-muted">
                      Source
                    </span>
                  </th>

                  <th className="px-5 py-3.5 text-left">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-text-muted">
                      Status
                    </span>
                  </th>

                  <th className="px-5 py-3.5 text-left">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-text-muted">
                      Assigned To
                    </span>
                  </th>

                  <th className="px-5 py-3.5 text-left">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-text-muted">
                      Date
                    </span>
                  </th>

                  <th className="px-5 py-3.5" />
                </tr>
              </thead>

              <tbody>
                {leads.map((lead) => (
                  <LeadRow key={lead.id} lead={lead} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MOBILE CARDS */}
        <div className="space-y-3 md:hidden">
          {leads.map((lead) => (
            <LeadMobileCard key={lead.id} lead={lead} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

const StatCard = ({ label, value, change, icon }: StatCardProps) => {
  return (
    <div
      className="
        rounded-xl
        border border-border
        bg-surface
        p-4 sm:p-5
      "
    >
      <div className="flex items-start justify-between">
        <div
          className="
            flex h-9 w-9
            items-center justify-center
            rounded-lg
            bg-primary/10
            text-primary
          "
        >
          {icon}
        </div>

        <span className="text-[11px] text-green-400">{change}</span>
      </div>

      <div className="mt-4">
        <p className="text-xs text-text-muted">{label}</p>

        <p className="mt-1 text-xl font-semibold text-text-primary sm:text-2xl">
          {value}
        </p>
      </div>
    </div>
  );
};

const FilterButton = ({
  label,
  icon,
}: {
  label: string;
  icon?: React.ReactNode;
}) => {
  return (
    <button
      type="button"
      className="
        flex items-center justify-between gap-2
        rounded-lg
        border border-border
        bg-background
        px-3 py-2
        text-xs
        text-text-secondary
        transition
        hover:bg-surface-hover
      "
    >
      <span className="flex items-center gap-1.5">
        {icon}
        {label}
      </span>

      <ChevronDown size={14} className="text-text-muted" />
    </button>
  );
};

const LeadRow = ({ lead }: { lead: (typeof leads)[number] }) => {
  return (
    <tr className="border-b border-border last:border-0 hover:bg-surface-hover/40">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-full
              bg-primary/10
              text-xs font-semibold
              text-primary
            "
          >
            {lead.name.charAt(0)}
          </div>

          <div>
            <p className="text-sm font-medium text-text-primary">{lead.name}</p>

            <p className="mt-0.5 text-xs text-text-muted">
              {lead.id} · {lead.location}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <span className="text-sm text-text-secondary">{lead.requirement}</span>
      </td>

      <td className="px-5 py-4">
        <span className="text-sm text-text-secondary">{lead.source}</span>
      </td>

      <td className="px-5 py-4">
        <span
          className={`
            inline-flex
            rounded-full
            px-2.5 py-1
            text-[11px] font-medium
            ${statusStyles[lead.status]}
          `}
        >
          {lead.status}
        </span>
      </td>

      <td className="px-5 py-4">
        <span className="text-sm text-text-secondary">{lead.assignedTo}</span>
      </td>

      <td className="px-5 py-4">
        <span className="text-xs text-text-muted">{lead.date}</span>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center justify-end gap-1">
          <button
            className="rounded-lg p-2 text-text-muted hover:bg-background hover:text-text-primary"
            title="View lead"
          >
            <Eye size={16} />
          </button>

          <button
            className="rounded-lg p-2 text-text-muted hover:bg-background hover:text-text-primary"
            title="Call"
          >
            <Phone size={16} />
          </button>

          <button
            className="rounded-lg p-2 text-text-muted hover:bg-background hover:text-text-primary"
            title="More"
          >
            <MoreHorizontal size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

const LeadMobileCard = ({ lead }: { lead: (typeof leads)[number] }) => {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-full
              bg-primary/10
              text-sm font-semibold
              text-primary
            "
          >
            {lead.name.charAt(0)}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-text-primary">
              {lead.name}
            </p>

            <p className="mt-0.5 text-xs text-text-muted">
              {lead.id} · {lead.location}
            </p>
          </div>
        </div>

        <span
          className={`
            shrink-0 rounded-full
            px-2.5 py-1
            text-[10px] font-medium
            ${statusStyles[lead.status]}
          `}
        >
          {lead.status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 border-t border-border pt-4">
        <div>
          <p className="text-[10px] uppercase tracking-wide text-text-muted">
            Requirement
          </p>
          <p className="mt-1 text-xs text-text-secondary">{lead.requirement}</p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-wide text-text-muted">
            Source
          </p>
          <p className="mt-1 text-xs text-text-secondary">{lead.source}</p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-wide text-text-muted">
            Assigned
          </p>
          <p className="mt-1 text-xs text-text-secondary">{lead.assignedTo}</p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-wide text-text-muted">
            Created
          </p>
          <p className="mt-1 text-xs text-text-secondary">{lead.date}</p>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className="
            flex flex-1 items-center justify-center gap-2
            rounded-lg
            border border-border
            py-2
            text-xs font-medium
            text-text-secondary
            hover:bg-surface-hover
          "
        >
          <Eye size={15} />
          View
        </button>

        <button
          type="button"
          className="
            flex flex-1 items-center justify-center gap-2
            rounded-lg
            bg-primary
            py-2
            text-xs font-medium
            text-white
            hover:opacity-90
          "
        >
          <Phone size={15} />
          Call
        </button>
      </div>
    </div>
  );
};

export default LeadsPage;
