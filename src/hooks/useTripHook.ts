import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {wait} from "./HookUtils.ts";
import {createTrip, getTrips} from "../Api.ts";

export default function useTripHook() {
    const queryClient = useQueryClient();

    const tripsQuery = useQuery({
        queryKey: ['trips'],
        queryFn: () => wait(1000).then(() =>  getTrips)
    })

    const createTripMutation = useMutation({
        mutationFn: createTrip,
        onSuccess: data => {
            queryClient.setQueryData(['trips', data.id], data)
           void queryClient.invalidateQueries({ queryKey: ['trips'] })
        },
    })

    return { createTripMutation, tripsQuery }
}