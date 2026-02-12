import { useQuery } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import type { SiteWideEffect } from '@/backend';

export function useSiteWideEffectState() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<SiteWideEffect | null>({
    queryKey: ['siteWideEffect'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getActiveSiteWideEffect();
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 30000, // Poll every 30 seconds
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
}
