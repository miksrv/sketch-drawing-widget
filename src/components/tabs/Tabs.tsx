import React, {useState} from "react";

import styles from './styles.module.sass'

interface TabsProps {
    children: React.ReactNode;
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
    const [activeTab, setActiveTab] = useState<string>((children as React.ReactElement<TabProps>[])[0].props.label);

    return (
        <div className={styles.tabs}>
            <div className={styles.tabButtons}>
                {(children as React.ReactElement<TabProps>[]).map((child) => (
                    <button
                        key={child.props.label}
                        disabled={child.props.disable}
                        onClick={() => {
                            if (!child.props.disable) {
                                setActiveTab(child.props.label)
                            }
                        }}
                        className={
                            child.props.disable
                                ? styles.disable
                                : activeTab === child.props.label ? styles.active : undefined
                        }
                    >
                        {child.props.label}
                    </button>
                ))}
            </div>
            <div className={styles.tabContent}>
                {(children as React.ReactElement<TabProps>[]).map((child) => {
                    if (child.props.label !== activeTab) return undefined;
                    return child.props.children;
                })}
            </div>
        </div>
    );
};

interface TabProps {
    label: string;
    disable?: boolean
    children: React.ReactNode;
}

export const Tab: React.FC<TabProps> = ({ children }) => <>children</>;

export default Tabs
