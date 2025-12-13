import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, LogIn, LogOut, X } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export function AdminToggle() {
  const { isAdmin, login, logout } = useAdmin();
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      toast({
        title: "Welcome, Admin! 👋",
        description: "You can now edit content by hovering over text.",
      });
      setShowLogin(false);
      setPassword("");
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect password.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "Admin session ended.",
    });
  };

  return (
    <>
      {/* Admin Toggle Button */}
      <motion.button
        onClick={() => isAdmin ? handleLogout() : setShowLogin(true)}
        className={`fixed bottom-6 left-6 z-50 p-3 rounded-full shadow-lg transition-colors ${
          isAdmin 
            ? "bg-green-500 hover:bg-green-600 text-white" 
            : "bg-secondary hover:bg-secondary/80 text-muted-foreground"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={isAdmin ? "Logout from admin" : "Admin login"}
      >
        {isAdmin ? <LogOut className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
      </motion.button>

      {/* Admin indicator */}
      {isAdmin && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-20 left-6 z-50 bg-green-500 text-white text-xs px-3 py-1.5 rounded-full shadow-lg"
        >
          Admin Mode Active
        </motion.div>
      )}

      {/* Login Modal */}
      <AnimatePresence>
        {showLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowLogin(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background border border-border rounded-2xl p-6 max-w-sm w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Lock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Admin Access</h3>
                    <p className="text-sm text-muted-foreground">Enter password to edit</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowLogin(false)}
                  className="p-2 hover:bg-secondary rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                />
                <Button type="submit" className="w-full">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
