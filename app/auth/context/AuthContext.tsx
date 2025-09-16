import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { supabase } from "@/utils/supabase";
import type { Session, User } from "@supabase/supabase-js";

type Employee = {
  id: string;
  name: string;
  is_admin: boolean;
  id_organization: string;
  id_user: string;
};

type AuthContextType = {
  session: Session | null;
  user: Session["user"] | null;
  employee: Employee | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [employee, setEmployee] = useState<Employee | null>();

  const fetchEmployee = async (user: User | undefined) => {
    if (user) {
      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .eq("id_user", user.id)
        .single();

      if (error) {
        console.error("Error fetching employee data:", error);
        setEmployee(null);
        return;
      }
      setEmployee(data);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      fetchEmployee(session?.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ session, user: session?.user ?? null, employee: employee ?? null }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
};
