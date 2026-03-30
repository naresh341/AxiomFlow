import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import GlobalSkeleton from "./Components/MiniComponent/GlobalSkeleton";
import PrivateRoute from "./Components/MiniComponent/PrivateRoute";
const CreateCustomDocumentation = lazy(
  () => import("./Components/CreateCustomDocumentation"),
);
const UpdgradePlan = lazy(() => import("./Components/UpdgradePlan"));
const MainLayout = lazy(() => import("./MainLayout/MainLayout"));
const Admin = lazy(() => import("./Pages/Admin_And_Government/Admin"));
const AuditLogs = lazy(() => import("./Pages/Admin_And_Government/AuditLogs"));
const Compliance = lazy(
  () => import("./Pages/Admin_And_Government/Compliance"),
);
const FeatureFlags = lazy(
  () => import("./Pages/Admin_And_Government/FeatureFlags"),
);
const Governance = lazy(
  () => import("./Pages/Admin_And_Government/Governance"),
);
const Organization = lazy(
  () => import("./Pages/Admin_And_Government/Organization"),
);
const Security = lazy(() => import("./Pages/Admin_And_Government/Security"));
const Analytics = lazy(() => import("./Pages/Analytics"));
const ApprovalHistory = lazy(() => import("./Pages/Approval/ApprovalHistory"));
const Approvals = lazy(() => import("./Pages/Approval/Approvals"));
const PendingApprovals = lazy(
  () => import("./Pages/Approval/PendingApprovals"),
);
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Integrations = lazy(() => import("./Pages/Integrations"));
const APIDocumentation = lazy(
  () => import("./Pages/Integrations/APIDocumentation"),
);
const Configure = lazy(() => import("./Pages/Integrations/Configure"));
const CustomIntegrationBuilder = lazy(
  () => import("./Pages/Integrations/CustomIntegrationBuilder"),
);
const DocumentationContent = lazy(
  () => import("./Pages/Integrations/DocumentationContent"),
);
const EmailSent = lazy(() => import("./Pages/Login/EmailSent"));
const ForgotPassword = lazy(() => import("./Pages/Login/ForgotPassword"));

const Login = lazy(() => import("./Pages/Login/Login"));
const PasswordReset = lazy(() => import("./Pages/Login/PasswordReset"));
const SignUp = lazy(() => import("./Pages/Login/SignUp"));
const Support = lazy(() => import("./Pages/Support"));
const Tasks = lazy(() => import("./Pages/Task/Tasks"));
const OrganizationSettings = lazy(
  () => import("./Pages/User_And_Organization/OrganizationSettings"),
);
const RolesAndPermissions = lazy(
  () => import("./Pages/User_And_Organization/RolesAndPermission"),
);
const TeamsManagement = lazy(
  () => import("./Pages/User_And_Organization/TeamsManagement"),
);
const Users = lazy(() => import("./Pages/User_And_Organization/Users"));
const UsersAndOrg = lazy(
  () => import("./Pages/User_And_Organization/UsersAndOrg"),
);
const WorkflowBuilder = lazy(() => import("./Pages/WorkFlow//WorkflowBuilder"));
const WorkflowDetailLayout = lazy(
  () => import("./Pages/WorkFlow//WorkflowDetailLayout"),
);
const WorkflowExecution = lazy(
  () => import("./Pages/WorkFlow//WorkflowExecution"),
);
const WorkflowOverview = lazy(
  () => import("./Pages/WorkFlow//WorkflowOverview"),
);
const WorkFlowApprovalDetail = lazy(
  () => import("./Pages/WorkFlow/WorkFlowApprovalDetail"),
);
const WorkFlowExecutionDetail = lazy(
  () => import("./Pages/WorkFlow/WorkFlowExecutionDetail"),
);
const WorkFlowVersionDetail = lazy(
  () => import("./Pages/WorkFlow/WorkFlowVersionDetail"),
);
const WorkFlows = lazy(() => import("./Pages/WorkFlow/WorkFlows"));
const WorkflowApprovals = lazy(
  () => import("./Pages/WorkFlow/WorkflowApprovals"),
);
const WorkflowTasks = lazy(() => import("./Pages/WorkFlow/WorkflowTasks"));
const WorkflowVersions = lazy(
  () => import("./Pages/WorkFlow/WorkflowVersions"),
);

function App() {
  return (
    <>
      <Suspense fallback={<GlobalSkeleton />}>
        <Routes>
          {/* <Route path="/" element={<Navigate to="/Login" replace />} /> */}
          <Route path="/Login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="/email-sent" element={<EmailSent />} />

          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Dashboard" element={<Dashboard />} />

            {/* ================= WORKFLOWS ================= */}

            <Route
              path="/workflows"
              element={
                <PrivateRoute>
                  <WorkFlows />
                </PrivateRoute>
              }
            />
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

            <Route
              path="/workflows/execution"
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

            <Route
              path="/tasks"
              element={
                <PrivateRoute>
                  <Tasks />
                </PrivateRoute>
              }
            />

            <Route path="/tasks/:status" element={<Tasks />} />

            {/* ================= APPROVALS (GLOBAL) ================= */}
            <Route
              path="/approvals"
              element={
                <PrivateRoute>
                  <Approvals />
                </PrivateRoute>
              }
            >
              <Route
                index
                element={
                  <PrivateRoute>
                    <PendingApprovals />
                  </PrivateRoute>
                }
              />
              <Route path="/approvals/:status" element={<PendingApprovals />} />
              <Route path="history" element={<ApprovalHistory />} />
            </Route>

            <Route path="/UsersAndOraganization" element={<UsersAndOrg />}>
              <Route index element={<Navigate to="users" replace />} />
              <Route
                path="users"
                element={
                  <PrivateRoute>
                    <Users />
                  </PrivateRoute>
                }
              />
              <Route
                path="roles-permissions"
                element={<RolesAndPermissions />}
              />
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

            <Route
              path="/Analytics"
              element={
                <PrivateRoute>
                  <Analytics />
                </PrivateRoute>
              }
            />
            <Route
              path="/Integrations"
              element={
                <PrivateRoute>
                  <Integrations />
                </PrivateRoute>
              }
            />
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
            <Route
              path="/Admin"
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              }
            />
            <Route
              path="/Support"
              element={
                <PrivateRoute>
                  <Support />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
