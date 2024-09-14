import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { BiChevronDown } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";

interface SidebarContext {
  isVisible: boolean;
  setIsVisible: (prev: boolean) => void;
}

const SidebarContext = createContext<SidebarContext | undefined>(undefined);

const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within an SidebarProvider");
  }
  return context;
};

interface SidebarItemProps {
  id: string;
  label: string;
  icon?: string;
  path: string;
}

const SidebarItem: FC<SidebarItemProps> = ({ id, label, icon, path }) => {
  const navigate = useNavigate();
  const { setIsVisible } = useSidebarContext();

  const onClick = () => {
    navigate(path);
    setIsVisible(false);
  };

  return (
    <li>
      <>
        <input type="radio" id={id} name="sidebar" onClick={onClick} />
        <label htmlFor={id}>
          {icon && <i className={icon}></i>}
          <p>{label}</p>
        </label>
      </>
    </li>
  );
};

interface SidebarSubMenuProps {
  id: string;
  label: string;
  icon?: string;
  children: ReactNode;
}

const SidebarSubMenu: FC<SidebarSubMenuProps> = ({
  id,
  label,
  icon,
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const submenuRef = useRef<HTMLUListElement>(null);

  return (
    <>
      <li>
        <input
          type="radio"
          id={id}
          name="sidebar"
          onClick={() => setIsOpen((prev) => !prev)}
        />
        <label htmlFor={id}>
          {icon && <i className={icon}></i>}
          <p>{label}</p>
          {/* <i className="ai-chevron-down-small"></i> */}
          <BiChevronDown />
        </label>

        <ul
          ref={submenuRef}
          className={`submenu ${isOpen ? "open" : ""}`}
          style={{
            height: isOpen ? `${submenuRef.current?.scrollHeight}px` : "0px",
          }}
        >
          {children}
        </ul>
      </li>
    </>
  );
};

interface SidebarProps {
  visible: boolean;
  onVisibilityChange: (visible: boolean) => void;
}

const Sidebar: FC<SidebarProps> = ({ visible, onVisibilityChange }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => setIsVisible(visible), [visible]);

  useEffect(() => {
    onVisibilityChange(isVisible);
  }, [isVisible, onVisibilityChange]);

  return (
    <SidebarContext.Provider value={{ isVisible, setIsVisible }}>
      <aside className={`sidebar ${isVisible ? "visible" : ""}`}>
        <ul>
          <SidebarItem id="home" label="Home" path="/home" />
          <SidebarItem id="users" label="Users" path="/users" />
          <SidebarItem id="tasks" label="Tasks" path="/tasks" />
          <SidebarSubMenu id="settings" label="Settings">
            <SidebarItem id="tasks" label="Tasks" path="/tasks" />
          </SidebarSubMenu>
        </ul>
      </aside>
    </SidebarContext.Provider>
  );
};

export default Sidebar;
