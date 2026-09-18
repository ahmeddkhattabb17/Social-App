import { ArrowRight } from "lucide-react";
import RouteLogo from "../assets/route.png";

export function AcademyIntro() {
  return (
    <section className="auth-brand">
      <div className="auth-logo-wrap">
        <img src={RouteLogo} alt="Route Academy" className="auth-logo" />
        <span>Route Posts</span>
      </div>

      <h1>Connect with friends and the world around you on Route Posts.</h1>

      <p className="auth-brand-copy">
        Share your thoughts, discover new posts, and stay connected with your community.
      </p>

      <div className="auth-brand-note">
        <span>Route Academy</span>
        <p>A social-media learning playground powered by the Route Posts API.</p>
        <ArrowRight size={17} />
      </div>
    </section>
  );
}
