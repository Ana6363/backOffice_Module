import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './services/Login';
import AuthCallback from './services/AuthCallback';
import Dashboard from './services/Dashboard';
import MainPagePatient from './pages/Patient/MainPagePatient';
import PrivacyPolicy from './pages/Patient/PrivacyPolicy';

import AdminPage from './pages/Admin/AdminPage';
import AdminSchedule from './pages/Admin/AdminSchedule/AdminSchedule'
import AdminStaff from './pages/Admin/AdminStaff/AdminStaff';
import CreateStaff from './pages/Admin/AdminStaff/CreateStaff';
import UpdateStaff from './pages/Admin/AdminStaff/UpdateStaff';
import AdminPatient from './pages/Admin/AdminPatient/AdminPatient';
import CreatePatient from './pages/Admin/AdminPatient/AdminPatientCreate'; 
import UpdatePatient from './pages/Admin/AdminPatient/AdminPatientUpdate';

import AdminOpType from './pages/Admin/AdminOpType/AdminOpType';
import CreateOpType from './pages/Admin/AdminOpType/CreateOpType';
import Patient from './pages/Patient/Patient';
import PatientUpdate from './pages/Patient/PatientUpdate';
import PatientDelete from './pages/Patient/PatientDelete';

import AdminSpecialization from './pages/Admin/AdminSpecializations/AdminSpecializations';
import CreateSpecialization from './pages/Admin/AdminSpecializations/AdminSpecializationCreate';
import UpdateSpecialization from './pages/Admin/AdminSpecializations/AdminSpecializationsUpdate';

import AdminRoomType from './pages/Admin/AdminRoomType/AdminRoomType';
import CreateRoomType from './pages/Admin/AdminRoomType/AdminRoomTypeCreate';

import AdminMedicalConditions from './pages/Admin/AdminMedicalConditions/AdminMedicalConditions';
import CreateMedicalConditions from './pages/Admin/AdminMedicalConditions/AdminCreateMedicalConditions';
import StaffMedicalConditions from './pages/Staff/StaffMedicalConditions';

import MainPageStaff from './pages/Staff/MainPageStaff';
import OperationRequest from './pages/Staff/OperationRequest';
import OperationRequestCreate from './pages/Staff/OperationRequestCreate';
import OperationRequestUpdate from './pages/Staff/OperationRequestUpdate';
import OperationRequestDelete from './pages/Staff/OperationRequestDelete';
import DeleteOpType from './pages/Admin/AdminOpType/DeleteOpType';
import UpdateOpType from './pages/Admin/AdminOpType/UpdateOpType';
import SurgeryRoom3D from './pages/Staff/SurgeryRoom3D';
import AppointmenCreate from './pages/Staff/AppointmentCreate';
import AdminSurgery from './pages/Admin/AdminSurgery/AdminSurgery';
import CreateSurgeryRoom from './pages/Admin/AdminSurgery/CreateSurgeryRoom';
import CreateAppointmentDetails from './pages/Staff/CreateAppointmentDetails';
import Appointment from './pages/Staff/Appointment';
import UpdateAppointmentDetails from './pages/Staff/UpdateAppointmentDetails';
import AppointmentUpdate from './pages/Staff/AppointmentUpdate';
import AdminAllergies from './pages/Admin/AdminAllergy/AdminAllergy';
import CreateAllergy from './pages/Admin/AdminAllergy/AdminCreateAllergy';
import StaffAllergies from './pages/Staff/StaffAllergy';



// A component to check the user's role and grant or deny access to certain routes
interface ProtectedRouteProps {
    allowedRoles: string[];
    redirectPath: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, redirectPath }) => {
    const userRole = localStorage.getItem('userRole');

    if (!userRole || !allowedRoles.includes(userRole)) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

const App: React.FC = () => {

    const userRole = localStorage.getItem('userRole');
    const userEmail = localStorage.getItem('userEmail');

    console.log("User role:", userRole);
    console.log("User email:", userEmail);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/dashboard" element={<Dashboard />} />



                {/* Admin routes protected for 'Admin' role only */}
                /*<Route element={<ProtectedRoute allowedRoles={['Admin']} redirectPath="/login" />}> *
                <Route path="/admin" element={<AdminPage />} />
                        <Route path="/admin/patient" element={<AdminPatient />} />
                        <Route path="/admin/schedule" element={<AdminSchedule />} />
                        <Route path="/admin/patient/create" element={<CreatePatient />} /> 
                        <Route path="/admin/patient/update/:phoneNumber" element={<UpdatePatient />} />
                        <Route path="/admin/staff" element={<AdminStaff />} />
                        <Route path="/admin/staff/create" element={<CreateStaff />} />
                        <Route path="/admin/staff/update/:staffId" element={<UpdateStaff />} /> 
                        <Route path="/admin/opTypes" element={<AdminOpType />} />
                        <Route path="/admin/opTypes/create" element={<CreateOpType />} />
                        <Route path="/admin/opTypes/update/:operationTypeId" element={<UpdateOpType />} />
                        <Route path="/admin/opTypes/delete/:operationTypeName" element={<DeleteOpType />} />
                        <Route path="/admin/surgeries" element={<AdminSurgery />} />
                        <Route path="/admin/createSurgeryRoom" element={<CreateSurgeryRoom />} />
                        <Route path="/admin/specializations" element={<AdminSpecialization />} />
                        <Route path="/admin/specializations/create" element={<CreateSpecialization />} />
                        <Route path="/admin/specializations/update/:specializationId" element={<UpdateSpecialization />} />
                        <Route path="/admin/roomtypes" element={<AdminRoomType />} />
                        <Route path="/admin/roomtypes/create" element={<CreateRoomType />} />
                        <Route path="/admin/allergies" element={<AdminAllergies />} />
                        <Route path="/admin/createAllergy" element={<CreateAllergy />} />
                        <Route path="/admin/medicalConditions" element={<AdminMedicalConditions />} />
                        <Route path="/admin/createMedicalCondition" element={<CreateMedicalConditions />} />



                </Route>

                 {/* Admin routes protected for 'Staff' role only */}
                 <Route element={<ProtectedRoute allowedRoles={['Doctor','Nurse']} redirectPath="/mainPageStaff" />}>
                    <Route path="/mainPageStaff" element={<MainPageStaff />} />
                    <Route path="/operationRequest" element={<OperationRequest />} />
                    <Route path="/operationRequest/create" element={<OperationRequestCreate />} />
                    <Route path="/operationRequest/update/:id" element={<OperationRequestUpdate />} />
                    <Route path="/operationRequest/delete/:id" element={<OperationRequestDelete />} />
                    <Route path="/operationRequest/createAppointment" element={<AppointmenCreate />} />
                    <Route path='/surgeryRoom3DModel' element={<SurgeryRoom3D/>} />
                    <Route path="/operationRequest/createAppointmentDetails" element={<CreateAppointmentDetails />} />
                    <Route path="/appointments" element={<Appointment />} />
                    <Route path="/appointments/update/:appointmentId" element={<AppointmentUpdate />} />
                    <Route path="/appointments/updateDetails" element={<UpdateAppointmentDetails />} />
                    <Route path="/allergies" element={<StaffAllergies/>} />
                    <Route path="/medicalConditions" element={<StaffMedicalConditions/>} />


                </Route>

                {/* Patient route protected for 'Patient' role only */}
                <Route element={<ProtectedRoute allowedRoles={['Patient']} redirectPath="/mainPagePatient" />}>
                    <Route path="/mainPagePatient" element={<MainPagePatient />} />
                    <Route path="/patient" element={<Patient />} />
                    <Route path="/patient/update" element={<PatientUpdate/>} />
                    <Route path="/patient/delete" element={<PatientDelete/>} />
                    <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;