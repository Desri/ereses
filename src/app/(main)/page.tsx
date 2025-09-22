"use client";
import HomePageComponent from "@/components/homepage";

// import { useLoginMutation } from "@/services/auth/useAuth";

export default function Home() {
  // const login = useLoginMutation();

  // const onSubmit = () => {
  //   const payload = {
  //     email: "super.user@simpuskes.com",
  //     password: "password",
  //   };
  //   login.mutate(payload, {
  //     onSuccess: (data) => {
  //       alert(data.message);
  //     },
  //     onError: (error: any) => {
  //       alert(error.message);
  //     },
  //   });
  // };

  return (
    <div className="main-page">
      <HomePageComponent />
    </div>
  );
}
