import RouteLogo from "./assets/route.png";
import type { AppUser } from "./services";

export const guest: AppUser = {
  _id: "guest",
  name: "Route Member",
  username: "route_member",
  email: "member@routeposts.com",
  photo: RouteLogo,
  followers: [],
  following: [],
};

export const stats = [
  ["2012", "Founded"],
  ["40K+", "Graduates"],
  ["50+", "Partner Companies"],
  ["5", "Branches"],
  ["20", "Diplomas Available"],
];

export const friends = [
  ["Alaa Ashraf", "alaaashraf", "213"],
  ["MrMo", "mrmo", "158"],
  ["menna", "gbngssssb", "126"],
  ["abdalla diaa", "abdalla_diaa", "121"],
  ["Jade", "jade", "98"],
];
