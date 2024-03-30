
const SyncMenuPage = () => {
  const handleCreateSyncRequest = () => {
    // Navigate to SyncRequestPage
    window.location.href = '/sync-request';
  };

  const handleViewSyncRequests = () => {
    // Navigate to SyncRequestArchivePage
    window.location.href = '/sync-request-archive';
  };

  const handleChangeConnection = () => {
    // Navigate back to SyncConnectionPage
    window.history.back();
  };

  return (
    <div>
      <h1>Sync Menu</h1>
      <div>
        <button className="big-button" onClick={handleCreateSyncRequest}>
          Create Sync Request
        </button>
      </div>
      <div>
        <button className="big-button" onClick={handleViewSyncRequests}>
          View Sync Requests
        </button>
      </div>
      <div>
        <button className="small-button" onClick={handleChangeConnection}>
          Change Connection
        </button>
      </div>
    </div>
  );
};

export default SyncMenuPage;