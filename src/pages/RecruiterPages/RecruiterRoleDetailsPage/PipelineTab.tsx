interface PipelineTabProps {
  roleId: string;
}
export const PipelineTab = ({ roleId }: PipelineTabProps) => {
  return (
    <div>PipelineTab{roleId}</div>
  )
}
