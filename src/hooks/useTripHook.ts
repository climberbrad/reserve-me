import {useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult} from "@tanstack/react-query";
import {wait} from "../util/DateUtils.ts";
import {TripData} from "../Types.ts";
import Api from "../Api.ts";

interface tripHookResponse {
    results: UseQueryResult<TripData[]>,
    create: UseMutationResult<TripData, Error, TripData, unknown>,
}

export default function useTripHook(): tripHookResponse {
    const queryClient = useQueryClient();
    const api = Api();

    const tripsQuery = useQuery({
        queryKey: ['trips'],
        queryFn: () => wait(1000).then(api.getTrips)
    })

    const createTripMutation = useMutation({
        mutationFn: api.createTrip,
        onSuccess: data => {
            queryClient.setQueryData(['trips', data.id], data) // optimistic update
            void queryClient.invalidateQueries({queryKey: ['trips']})
        },
    })

    return {results: tripsQuery, create: createTripMutation}
}