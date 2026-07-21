import { useEffect, useState } from 'react';
import Loader from '../../components/common/Loader';
import HeroSection from '../../components/sections/HeroSection';
import WhyNivoxSection from '../../components/sections/WhyNivoxSection';
import HubExperienceSection from '../../components/sections/HubExperienceSection';
import ExperienceNivoxSection from '../../components/sections/ExperienceNivoxSection';
import BuiltForEveryStudentSection from '../../components/sections/BuiltForEveryStudentSection';

import InsideNivoxSection from "../../components/sections/InsideNivoxSection";

import MembershipAccessSection from '../../components/sections/MembershipAccessSection';
import PartnershipSection from '../../components/sections/PartnershipSection';
import FinalCtaSection from '../../components/sections/FinalCtaSection';
import FooterSection from '../../components/sections/FooterSection';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <HeroSection />
      <WhyNivoxSection />
      <HubExperienceSection />
      <ExperienceNivoxSection />
      <BuiltForEveryStudentSection />
      <MembershipAccessSection />
      <PartnershipSection />
      <FinalCtaSection />
      <FooterSection />
    </>
  );
};

export default HomePage;
