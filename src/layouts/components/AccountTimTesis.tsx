import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

const AccountTimTesis = () => {
  return (
    <div className="flex-1 px-4">
      <Card
        className="shadow-xl"
        HeaderElement={
          <CardHeader>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
        }
        ContentElement={
          <div className="space-y-4">
            <div className="space-y-1">
              <h3>Nama</h3>
              <Input placeholder="Piero Schirano" />
              <h3>Username</h3>
              <Input placeholder="@skirano" />
            </div>
            <div className="flex justify-end">
              <Button>Save changes</Button>
            </div>
          </div>
        }
      />

      {/* bagian bawah */}
      <div className="flex flex-row gap-4 ">
        <div className="flex-1 py-4">
          <Card
            className="shadow-xl"
            HeaderElement={
              <CardHeader>
                <CardTitle>Dimensions</CardTitle>
                <CardDescription>
                  Set the dimensions for the layer.
                </CardDescription>
              </CardHeader>
            }
            ContentElement={
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2">
                  <h3 className="w-32">Width</h3>
                  <Input placeholder="100%" />
                </div>
                <div className="flex items-center space-x-2">
                  <h3 className="w-32">Max. width</h3>
                  <Input placeholder="300px" />
                </div>
                <div className="flex items-center space-x-2">
                  <h3 className="w-32">Height</h3>
                  <Input placeholder="25px" />
                </div>
                <div className="flex items-center space-x-2">
                  <h3 className="w-32">Max. height</h3>
                  <Input placeholder="none" />
                </div>
              </div>
            }
          />
        </div>

        <div className="flex-1 py-4 ">
          <Card
            className="shadow-xl"
            ContentElement={
              <div className="flex flex-col justify-start">
                <h3>Suggestions</h3>
                <Button
                  className="justify-start bg-white pl-3 text-black hover:bg-secondary hover:text-black"
                  style={{ height: "33px" }}
                >
                  Calendar
                </Button>
                <Button
                  className="justify-start bg-white pl-3 text-black hover:bg-secondary hover:text-black"
                  style={{ height: "33px" }}
                >
                  Search Emoji
                </Button>
                <Button
                  className="justify-start bg-white text-black hover:bg-secondary hover:text-black"
                  style={{ height: "33px" }}
                >
                  Calculator
                </Button>

                <h3>Settings</h3>
                <Button
                  className="justify-start bg-white text-black hover:bg-secondary hover:text-black"
                  style={{ height: "33px" }}
                >
                  Profile
                </Button>
                <Button
                  className="justify-start bg-white text-black hover:bg-secondary hover:text-black"
                  style={{ height: "33px" }}
                >
                  Billing
                </Button>
                <Button
                  className="justify-start bg-white text-black hover:bg-secondary hover:text-black"
                  style={{ height: "33px" }}
                >
                  Settings
                </Button>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AccountTimTesis;
