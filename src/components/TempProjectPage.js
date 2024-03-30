import React, { useState } from 'react';
import CreateEventPage from "./CreateEventPage"

function TempProjectPage({navigateTo, project}) {
    const [openModalCreate, setOpenCreateModal] = useState(false)

    return(
        <div>
        <p>You opened {project}!</p>

        <button className="create-event-button" onClick={() => setOpenCreateModal((true))}>+ Create Event</button>
            <CreateEventPage open={openModalCreate} onClose={() => setOpenCreateModal(false)}></CreateEventPage>
        </div>
    );
}

export default TempProjectPage;