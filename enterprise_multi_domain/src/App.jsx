import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import CreateCustomDocumentation from "./Components/CreateCustomDocumentation";
import UpdgradePlan from "./Components/UpdgradePlan";
import MainLayout from "./MainLayout/MainLayout";
import Admin from "./Pages/Admin_And_Government/Admin";
import AuditLogs from "./Pages/Admin_And_Government/AuditLogs";
import Compliance from "./Pages/Admin_And_Government/Compliance";
import FeatureFlags from "./Pages/Admin_And_Government/FeatureFlags";
import Governance from "./Pages/Admin_And_Government/Governance";
import Organization from "./Pages/Admin_And_Government/Organization";
import Security from "./Pages/Admin_And_Government/Security";
import Analytics from "./Pages/Analytics";
import ApprovalHistory from "./Pages/Approval/ApprovalHistory";
import Approvals from "./Pages/Approval/Approvals";
import PendingApprovals from "./Pages/Approval/PendingApprovals";
import Dashboard from "./Pages/Dashboard";
import Integrations from "./Pages/Integrations";
import APIDocumentation from "./Pages/Integrations/APIDocumentation";
import Configure from "./Pages/Integrations/Configure";
import CustomIntegrationBuilder from "./Pages/Integrations/CustomIntegrationBuilder";
import DocumentationContent from "./Pages/Integrations/DocumentationContent";
import EmailSent from "./Pages/Login/EmailSent";
import ForgotPassword from "./Pages/Login/ForgotPassword";
import Login from "./Pages/Login/Login";
import PasswordReset from "./Pages/Login/PasswordReset";
import SignUp from "./Pages/Login/SignUp";
import Support from "./Pages/Support";
import Tasks from "./Pages/Task/Tasks";
import OrganizationSettings from "./Pages/User_And_Organization/OrganizationSettings";
import RolesAndPermissions from "./Pages/User_And_Organization/RolesAndPermission";
import TeamsManagement from "./Pages/User_And_Organization/TeamsManagement";
import Users from "./Pages/User_And_Organization/Users";
import UsersAndOrg from "./Pages/User_And_Organization/UsersAndOrg";
import WorkflowBuilder from "./Pages/WorkFlow//WorkflowBuilder";
import WorkflowDetailLayout from "./Pages/WorkFlow//WorkflowDetailLayout";
import WorkflowExecution from "./Pages/WorkFlow//WorkflowExecution";
import WorkflowOverview from "./Pages/WorkFlow//WorkflowOverview";
import WorkFlowApprovalDetail from "./Pages/WorkFlow/WorkFlowApprovalDetail";
import WorkFlowExecutionDetail from "./Pages/WorkFlow/WorkFlowExecutionDetail";
import WorkFlowVersionDetail from "./Pages/WorkFlow/WorkFlowVersionDetail";
import WorkFlows from "./Pages/WorkFlow/WorkFlows";
import WorkflowApprovals from "./Pages/WorkFlow/WorkflowApprovals";
import WorkflowTasks from "./Pages/WorkFlow/WorkflowTasks";
import WorkflowVersions from "./Pages/WorkFlow/WorkflowVersions";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/Login" replace />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/email-sent" element={<EmailSent />} />

        <Route element={<MainLayout />}>
          <Route path="/Dashboard" element={<Dashboard />} />

          {/* ================= WORKFLOWS ================= */}

          <Route path="/workflows" element={<WorkFlows />} />
          <Route path="/workflows/:status" element={<WorkFlows />} />

          <Route
            path="/workflows/:workflow_id_str"
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

          <Route path="/workflows/execution" element={<WorkflowExecution />} />

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
            element={<WorkFlowApprovalDetail />}
          />
          <Route
            path="/workflows/:workflowId/execution/:executionId"
            element={<WorkFlowExecutionDetail />}
          />
          <Route
            path="/workflows/:workflowId/version/:versionId"
            element={<WorkFlowVersionDetail />}
          />

          <Route path="/workflows/create" element={<WorkflowBuilder />} />

          <Route
            path="/workflows/builder/:workflowId"
            element={<WorkflowBuilder />}
          />

          {/* ================= TASKS (GLOBAL) ================= */}

          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/:status" element={<Tasks />} />

          {/* ================= APPROVALS (GLOBAL) ================= */}

          <Route path="/approvals" element={<Approvals />}>
            <Route index element={<PendingApprovals />} />
            <Route path="/approvals/:status" element={<PendingApprovals />} />
            <Route path="history" element={<ApprovalHistory />} />
          </Route>

          <Route path="/UsersAndOraganization" element={<UsersAndOrg />}>
            <Route index element={<Navigate to="users" replace />} />
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
