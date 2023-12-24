import {useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult} from "@tanstack/react-query";
import {wait} from "../util/DateUtils.ts";
import {createTrip, getTrips} from "../Api.ts";
import {TripData} from "../Types.ts";

interface tripHookResponse {
    results: UseQueryResult<TripData[]>,
    create: UseMutationResult<TripData, Error, TripData, unknown>,
}

export default function useTripHook(): tripHookResponse {
    const queryClient = useQueryClient();

    const tripsQuery = useQuery({
        queryKey: ['trips'],
        queryFn: () => wait(1000).then(getTrips)
    })

    const createTripMutation = useMutation({
        mutationFn: createTrip,
        onSuccess: data => {
            queryClient.setQueryData(['trips', data.id], data)
           void queryClient.invalidateQueries({ queryKey: ['trips'] })
        },
    })

    return { results: tripsQuery, create: createTripMutation }
}