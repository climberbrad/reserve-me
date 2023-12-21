import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {wait} from "./HookUtils.ts";
import {TripData} from "../Trip.tsx";
import {sampleTrips} from "../SampleData.ts";


export default function useTripHook() {
    const queryClient = useQueryClient();

    const tripsQuery = useQuery({
        queryKey: ['trips'],
        queryFn: () => wait(1000).then(() =>  [...sampleTrips])
    })

    const createTrip = useMutation({
        mutationFn: (trip: TripData) => wait(1000).then(() => sampleTrips.push({...trip, id: crypto.randomUUID()})),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trips'] })
        },
    })

    return { createTrip, tripsQuery }
}