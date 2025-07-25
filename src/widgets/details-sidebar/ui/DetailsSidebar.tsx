import { UserDetailsForm } from "../../../features/user-details-form";
import {
  PortalWrapper,
  SidebarBase,
  useAppDispatch,
  type DetailsSidebarPropsType,
} from "../../../shared";
import { setSidebarProps } from "../../user-table/model/slice";

type DetailsSidebarProps = {
  containerId: string;
  initialFormData: DetailsSidebarPropsType["formData"];
  type: DetailsSidebarPropsType["formType"];
};

export default function DetailsSidebar({
  containerId,
  initialFormData,
  type,
}: DetailsSidebarProps) {
  const dispatch = useAppDispatch();
  const closeHandler = () => {
    dispatch(setSidebarProps({ formType: null, formData: null }));
  };
  return (
    <PortalWrapper containerId={containerId}>
      <SidebarBase
        onClose={closeHandler}
        isOpen={Boolean(type)}
        title="Редактирование юзера"
      >
        {type === "userDetails" && <UserDetailsForm {...initialFormData} />}
      </SidebarBase>
    </PortalWrapper>
  );
}
