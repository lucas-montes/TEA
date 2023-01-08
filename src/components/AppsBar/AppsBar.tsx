import SideBarIcons from '../../constants/SideBarIcons';


const AppsBar = () => {
  return (
    <div className="left-0 w-1/4 bg-white dark:bg-gray-900 shadow-lg">
      {SideBarIcons.map((value, index) => {
        return SideBarIcon(value.icon, value.className, value.tooltipClassName, value.tooltipText, index.toString())
      })}
    </div>
  );
};

const SideBarIcon = (
  icon: JSX.Element,
  className: string,
  tooltipClassName: string,
  tooltipText: string,
  key: string
) => (
  <div key={key} className={className}>
    {icon}
    <span className={tooltipClassName}>
      {tooltipText}
    </span>
  </div>
);


const Divider = () => <hr className="sidebar-hr" />;

export default AppsBar;
