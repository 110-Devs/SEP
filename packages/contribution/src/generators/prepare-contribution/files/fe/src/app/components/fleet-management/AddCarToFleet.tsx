import * as React from 'react';
import {useState} from "react";
import CommandButton from "@frontend/app/components/core/CommandButton";
import {FleetManagementAddCarToFleetRuntimeInfo} from "@app/shared/commands/fleet-management/add-car-to-fleet";
import CommandDialog from "@frontend/app/components/core/CommandDialog";
import {addCarToFleet} from "@frontend/commands/fleet-management/use-add-car-to-fleet";

interface OwnProps {

}

type AddCarToFleetProps = OwnProps;

const AddCarToFleet = (props: AddCarToFleetProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {setDialogOpen(true)};
  const handleCloseDialog = () => {setDialogOpen(false)};

  return <>
    <CommandButton command={FleetManagementAddCarToFleetRuntimeInfo} onClick={handleOpenDialog} />
    <CommandDialog open={dialogOpen} onClose={handleCloseDialog} commandDialogCommand={FleetManagementAddCarToFleetRuntimeInfo} commandFn={addCarToFleet} />
  </>
};

export default AddCarToFleet;
