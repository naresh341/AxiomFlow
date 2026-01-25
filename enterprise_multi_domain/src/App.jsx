import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import APIDocumentation from "./Components/APIDocumentation";
import CreateCustomDocumentation from "./Components/CreateCustomDocumentation";
import CustomIntegrationBuilder from "./Components/CustomIntegrationBuilder";
import DocumentationContent from "./Components/DocumentationContent";
import UpdgradePlan from "./Components/UpdgradePlan";
import MainLayout from "./MainLayout/MainLayout";
import Admin from "./Pages/Admin";
import Analytics from "./Pages/Analytics";
import ApprovalDetail from "./Pages/ApprovalDetail";
import ApprovalHistory from "./Pages/ApprovalHistory";
import Approvals from "./Pages/Approvals";
import AuditLogs from "./Pages/AuditLogs";
import Compliance from "./Pages/Compliance";
import Configure from "./Pages/Configure";
import Dashboard from "./Pages/Dashboard";
import ExecutionDetail from "./Pages/ExecutionDetail";
import FeatureFlags from "./Pages/FeatureFlags";
import ForgotPassword from "./Pages/ForgotPassword";
import Governance from "./Pages/Governance";
import IndustryModules from "./Pages/IndustryModules";
import Integrations from "./Pages/Integrations";
import Login from "./Pages/Login";
import Organization from "./Pages/Organization";
import OrganizationSettings from "./Pages/OrganizationSettings";
import PendingApprovals from "./Pages/PendingApprovals";
import RolesAndPermissions from "./Pages/RolesAndPermission";
import Security from "./Pages/Security";
import SignUp from "./Pages/SignUp";
import Support from "./Pages/Support";
import Tasks from "./Pages/Tasks";
import TeamsManagement from "./Pages/TeamsManagement";
import Users from "./Pages/Users";
import UsersAndOrg from "./Pages/UsersAndOrg";
import VersionDetail from "./Pages/VersionDetail";
import WorkflowApprovals from "./Pages/WorkflowApprovals";
import WorkflowBuilder from "./Pages/WorkflowBuilder";
import WorkflowDetailLayout from "./Pages/WorkflowDetailLayout";
import WorkflowExecution from "./Pages/WorkflowExecution";
import WorkflowOverview from "./Pages/WorkflowOverview";
import WorkFlows from "./Pages/WorkFlows";
import WorkflowTasks from "./Pages/WorkflowTasks";
import WorkflowVersions from "./Pages/WorkflowVersions";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/Login" replace />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<MainLayout />}>
          <Route path="/Dashboard" element={<Dashboard />} />

          {/* ================= WORKFLOWS ================= */}

          <Route path="/workflows" element={<WorkFlows />}>
            {/* Workflow list tabs */}
            {/* <Route index element={<WorkflowActiveList />} />
            <Route path="active" element={<WorkflowActiveList />} />
            <Route path="draft" element={<WorkflowDraftList />} />
            <Route path="archived" element={<WorkflowArchivedList />} /> */}
          </Route>

          <Route
            path="/workflows/:workflowId"
            element={<WorkflowDetailLayout />}
          >
            <Route index element={<WorkflowOverview />} />
          </Route>
          <Route
            path="/workflows/:workflowId/tasks"
            element={<WorkflowTasks />}
          />
          <Route
            path="/workflows/:workflowId/execution"
            element={<WorkflowExecution />}
          />
          <Route
            path="/workflows/:workflowId/approvals"
            element={<WorkflowApprovals />}
          />
          <Route
            path="workflows/:workflowId/version"
            element={<WorkflowVersions />}
          />
          <Route
            path="/workflows/:workflowId/approvals/:approvalId"
            element={<ApprovalDetail />}
          />
          <Route
            path="/workflows/:workflowId/execution/:executionId"
            element={<ExecutionDetail />}
          />
          <Route
            path="/workflows/:workflowId/version/:versionId"
            element={<VersionDetail />}
          />

          {/* Create workflow */}
          <Route path="/workflows/create" element={<WorkflowBuilder />} />

          {/* ================= TASKS (GLOBAL) ================= */}

          <Route path="/tasks" element={<Tasks />}>
            {/* <Route index element={<MyTasks />} />
            <Route path="assigned" element={<MyTasks />} />
            <Route path="overdue" element={<OverdueTasks />} /> */}
          </Route>

          {/* ================= APPROVALS (GLOBAL) ================= */}

          <Route path="/approvals" element={<Approvals />}>
            <Route index element={<PendingApprovals />} />
            <Route path="history" element={<ApprovalHistory />} />
          </Route>

          <Route path="/UsersAndOraganization" element={<UsersAndOrg />}>
            {/* Default sub-route */}
            <Route index element={<Navigate to="users" replace />} />

            {/* Sub-tab routes */}
            <Route path="users" element={<Users />} />
            <Route path="roles-permissions" element={<RolesAndPermissions />} />
            <Route path="teams" element={<TeamsManagement />} />
            <Route
              path="organization-settings"
              element={<OrganizationSettings />}
            />
          </Route>

          <Route path="/Admin" element={<Admin />} />

          <Route path="Admin/Organization" element={<Organization />} />
          <Route
            path="Admin/Organization/UpgradePlan"
            element={<UpdgradePlan />}
          />
          <Route path="Admin/security" element={<Security />} />
          <Route path="Admin/audit-logs" element={<AuditLogs />} />
          <Route path="Admin/compliance" element={<Compliance />} />
          <Route path="Admin/feature-flags" element={<FeatureFlags />} />
          <Route path="Admin/governance" element={<Governance />} />

          <Route path="/Analytics" element={<Analytics />} />
          <Route path="/IndustryModules" element={<IndustryModules />} />
          <Route path="/Integrations" element={<Integrations />} />
          <Route
            path="/Integrations/documentation"
            element={<APIDocumentation />}
          />
          <Route
            path="/Integrations/createIntegration"
            element={<CustomIntegrationBuilder />}
          />
          <Route
            path="/Integrations/createIntegration/CustomIntegrationDocumentation"
            element={<CreateCustomDocumentation />}
          />
          <Route
            path="/Integrations/documentation/DocumentationContent"
            element={<DocumentationContent />}
          />
          <Route path="/Integrations/configure/:id" element={<Configure />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Support" element={<Support />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
