"use client";

import React, { ReactNode, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";
import axios from "axios";
import { vetAgent } from "./VetAgentCard";
import { Loader2 } from "lucide-react";
import SuggestedVetCard from "./SuggestedVetCard";
import { VetAgents } from "@/shared/VetAgents";

interface NewSessionProps {
  children: ReactNode;
}

export default function NewSession({ children }: NewSessionProps) {
  const [note, setNote] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestedVets, setSuggestedVets] = useState<vetAgent[]>();
  const [selectedVet, setSelectedVet] = useState<vetAgent>();

  const OnClickNext = async () => {
    setLoading(true);
    const result = await axios.post("/api/suggest-vet", {
      notes: note,
    });

    console.log(result.data);
    setSuggestedVets(result.data.suggestedVets);
    setLoading(false);
  };

  const onStartConsultation = async () => {
    setLoading(true);
    // save the note and selected vet to db
    const res = await axios.post("/api/session-chat", {
      notes: note,
      selectedVet: selectedVet,
    });
    console.log(res.data);
    if (res.data?.sessionId) {
      console.log(res.data.sessionId);
      // route to consultation page
    }
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {!suggestedVets ? (
            <>
              <DialogTitle>Add Basic Details</DialogTitle>
              <DialogDescription asChild>
                <div>
                  <h2>Add Symptoms or Any Other Details</h2>
                  <Textarea
                    placeholder="Add Details Here..."
                    className="h-[200px] mt-2"
                    onChange={(event) => setNote(event.target.value)}
                  />
                </div>
              </DialogDescription>
            </>
          ) : (
            <>
              <DialogTitle>Select a Veterinarian</DialogTitle>
              <DialogDescription asChild>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-5">
                  {suggestedVets.map((vet) => (
                    <SuggestedVetCard
                      vetAgent={vet}
                      key={vet.id}
                      setSelectedVet={() => setSelectedVet(vet)}
                      // @ts-ignore
                      selectedVet={selectedVet}
                    />
                  ))}
                </div>
              </DialogDescription>
            </>
          )}
        </DialogHeader>
        <DialogFooter>
          {!suggestedVets ? (
            <Button disabled={!note || loading} onClick={() => OnClickNext()}>
              Next
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <IconArrowRight />
              )}
            </Button>
          ) : (
            <Button disabled={loading || !selectedVet} onClick={() => onStartConsultation()}>
              Start Consultation
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <IconArrowRight />
              )}{" "}
            </Button>
          )}
          <DialogClose asChild>
            <Button variant="outline" className="ml-2">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
