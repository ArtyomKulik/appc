import { PortalWrapper } from "../../../shared";

type DetailsSidebarProps = {
  containerId: string;
};

export default function DetailsSidebar({ containerId }: DetailsSidebarProps) {
  return (
    <PortalWrapper containerId={containerId}>
      <div className="sffff">DetailsSidebar</div>
    </PortalWrapper>
  );
}
    