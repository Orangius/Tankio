import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TankDataType } from "@/app/dashboard/page";
// imports for the dialog
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
//fa icons
import { FaPlus } from "react-icons/fa";
import React from "react";
import { addTankField } from "@/lib/serverActions";
import { useState } from "react";

import { useFormStatus } from "react-dom";
const formSchema = z.object({
  deviceID: z
    .string()
    .min(5, {
      message: "ID incomplete",
    })
    .max(5, {
      message: "ID must be 5 characters",
    }),
});

const DialogBox = ({
  userTankData,
  setTank,
}: {
  userTankData: TankDataType | undefined;
  setTank: () => void;
}) => {
  const CreateDeviceForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deviceID: "",
    },
  });
  const [openDialog, setOpenDialog] = useState(false);

  const [error, setError] = useState<string>();

  const { pending, data, method, action } = useFormStatus();
  if (pending) console.log("Pendingggggg");

  async function submitNewDevice(values: z.infer<typeof formSchema>) {
    try {
      const res = await addTankField(userTankData?.username, values.deviceID);
      console.log("response from adding a tank", res);
      if (res.acknowledged) {
        console.log("acknowledged");
        //setOpenDialog(false);
        setTank();
      }
    } catch (err) {
      console.log(err);
      setError("Couldn't register device");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h3 className="text-center mb-4 md:text-2xl">
        Add your tank monitor device to get started
      </h3>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button className="rounded-[24px]">
            <FaPlus />
            <span className="font-bold ml-2 text-lg">Add new</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="w-4/5 border-primary rounded-2xl">
          <DialogHeader>
            <DialogTitle>Enter Device ID</DialogTitle>
            <DialogDescription>
              You will be able to control the tanks associated with this device
              from your dashboard
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center space-x-2 relative">
            <Form {...CreateDeviceForm}>
              <form
                id="deviceRegForm"
                onSubmit={CreateDeviceForm.handleSubmit(submitNewDevice)}
                className="w-full"
              >
                <FormField
                  control={CreateDeviceForm.control}
                  name="deviceID"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        {/* <FormLabel>Username</FormLabel> */}
                        <FormControl>
                          <Input
                            placeholder="Enter your Device ID"
                            type="text"
                            {...field}
                            className="rounded-3xl"
                          />
                        </FormControl>
                        <FormMessage className="absolute top-10 left-0" />
                      </FormItem>
                    );
                  }}
                />
              </form>
            </Form>
            <Button
              form="deviceRegForm"
              className="rounded-full bg-primary text-lg text-primary-foreground"
            >
              Register
            </Button>
          </div>
          {error ? <h3 className="text-center text-red-500">{error}</h3> : null}
          <DialogFooter className="flex gap- justify-start mt-4">
            <DialogClose asChild>
              <h3 className="cursor-pointer">Close</h3>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogBox;
