import { useEffect, useState, ReactNode } from "react";

interface HydrationZustandProps {
    children: ReactNode;
}

const HydrationZustand: React.FC<HydrationZustandProps> = ({ children }) => {
    const [isHydrated, setIsHydrated] = useState(false);

    // Wait till Next.js rehydration completes
    useEffect(() => {
        setIsHydrated(true);
    }, []);

    return <>{isHydrated ? <div>{children}</div> : null}</>;
};

export default HydrationZustand;