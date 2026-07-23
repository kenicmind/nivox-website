import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, Phone, GraduationCap, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { auth, db } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RegisterPage = () => {
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const navigate = useNavigate();

const [fullName, setFullName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [university, setUniversity] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [agree, setAgree] = useState(false);
const [loading, setLoading] = useState(false);

const handleRegister = async (e) => {
  e.preventDefault();


  if (!agree) {
    toast.error("Please accept the Terms & Conditions.");
    return;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords do not match.");
    return;
  }

  if (password.length < 8) {
    toast.error("Password must be at least 8 characters.");
    return;
  }

  try {
    setLoading(true);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // Send verification email
    try {
      await sendEmailVerification(user);
    } catch (verificationError) {
      console.error("Error sending verification email:", verificationError);
      toast.error("Failed to send verification email. You can request one later.");
    }

    // Create user document in Firestore users collection
    try {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: fullName ? fullName.trim() : "",
        email: email ? email.trim() : "",
        phone: phone ? phone.trim() : "",
        school: university ? university.trim() : "",
        course: "",
        level: "",
        membership: "Student",
        role: "student",
        profileCompleted: false,
        emailVerified: false,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      });
    } catch (firestoreError) {
      console.error("Firestore document creation error:", firestoreError);
      toast.error("Account created, but profile setup failed. Please contact support.");
    }

    toast.success(
      "Account created successfully! Please check your email to verify your account."
    );

    navigate("/verify-email");

  } catch (error) {

  if (error.code === "auth/email-already-in-use") {

    toast.error("This email is already registered.");

  } else if (error.code === "auth/invalid-email") {

    toast.error("Please enter a valid email address.");

  } else if (error.code === "auth/weak-password") {

    toast.error("Password must be at least 8 characters.");

  } else {

    toast.error(error.message);

  }

} finally {
  setLoading(false);
}
};

  return (
    <main className="min-h-screen flex items-center justify-center bg-[linear-gradient(125deg,_#2B0A5A_0%,_#140726_55%,_#0C031C_100%)] px-6 py-20">
        <div className="absolute inset-0 opacity-[0.13] [background-image:linear-gradient(to_right,rgba(255,255,255,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:42px_42px]" />

        <div className="absolute left-[-8%] top-[-8%] h-72 w-72 rounded-full bg-fuchsia-500/25 blur-[120px]" />

        <div className="absolute bottom-[-10%] right-[-8%] h-80 w-80 rounded-full bg-[#FFD54A]/15 blur-[140px]" />
       <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 w-full max-w-md rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.35)]"
        >
            <div className="text-center">

            {/* Logo */}
            <img
                src="/images/logo.png"
                alt="NIVOX Logo"
                className="mx-auto h-20 w-auto"
            />

            <h1 className="mt-6 text-3xl font-black text-white">
                Create Your NIVOX Account
            </h1>

          <p className="mt-3 text-white/70 leading-7">
              Join the future of learning, innovation and collaboration.
          </p>

          </div>

          <form onSubmit={handleRegister} className="mt-8 space-y-5">
          <div className="relative">
            <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
            <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-12 pr-4 text-white placeholder:text-white/50 focus:border-[#FFD54A] focus:outline-none focus:ring-2 focus:ring-[#FFD54A]/30"
                />
            </div>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
            <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-12 pr-4 text-white placeholder:text-white/50 focus:border-[#FFD54A] focus:outline-none focus:ring-2 focus:ring-[#FFD54A]/30"
            />
            </div>

          <div className="relative">
            <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
            <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-12 pr-4 text-white placeholder:text-white/50 focus:border-[#FFD54A] focus:outline-none focus:ring-2 focus:ring-[#FFD54A]/30"
            />
            </div>

          <div className="relative">
            <GraduationCap className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
            <input
                type="text"
                placeholder="University / Institution"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-12 pr-4 text-white placeholder:text-white/50 focus:border-[#FFD54A] focus:outline-none focus:ring-2 focus:ring-[#FFD54A]/30"
            />
            </div>

         <div className="relative">
        <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />

        <input
            type={showPassword ? "text" : "password"}
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-12 pr-12 text-white placeholder:text-white/50 focus:border-[#FFD54A] focus:outline-none focus:ring-2 focus:ring-[#FFD54A]/30"
        />

        <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-[#FFD54A]"
        >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
        </div>
            <div className="relative">
            <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />

            <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-12 pr-12 text-white placeholder:text-white/50 focus:border-[#FFD54A] focus:outline-none focus:ring-2 focus:ring-[#FFD54A]/30"
            />

            <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-[#FFD54A]"
            >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            </div>
            <div className="flex items-start gap-3 text-sm text-white/70">
            <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-white/30 accent-[#FFD54A]"
             />
            <p>
                I agree to the{" "}
                <span className="font-semibold text-[#FFD54A]">
                Terms & Conditions
                </span>{" "}
                and{" "}
                <span className="font-semibold text-[#FFD54A]">
                Privacy Policy
                </span>.
            </p>
            </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-[#FFD54A] py-3.5 text-lg font-bold text-[#140726] transition duration-300 hover:scale-[1.02] hover:shadow-[0_15px_35px_rgba(255,213,74,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
            >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p className="mt-6 text-center text-white/70">
        Already have an account?{" "}
        <Link
            to="/login"
            className="font-bold text-[#FFD54A] hover:underline"
        >
            Sign In
        </Link>
        </p>

      </motion.div>
    </main>
  );
};

export default RegisterPage;
