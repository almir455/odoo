import Organization from "./pages/Organization";
import AssetRegistration from "./pages/AssetRegistration";
import AssetAllocation from "./pages/AssetAllocation";
import ResourceBooking from "./pages/ResourceBooking";
import MaintenanceManagement from "./pages/MaintenanceManagement";
import AssetAudit from "./pages/AssetAudit";
import ReportsAnalytics from "./pages/ReportsAnalytics";
import ActivityLogs from "./pages/ActivityLogs";
function App(){

  return(

    <div>

      <Organization />

      <hr/>

      <AssetRegistration />

      <hr/>

      <AssetAllocation />

      <hr/>

      <ResourceBooking />

      <hr/>

      <MaintenanceManagement />
     

     <hr/>

      <AssetAudit />
     
     <hr/>

      <ReportsAnalytics />
     <hr/>

      <ActivityLogs />
    

    </div>

  );

}


export default App;


