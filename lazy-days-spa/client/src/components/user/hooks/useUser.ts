import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

import type { User } from '../../../../../shared/types';
import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import {
  clearStoredUser,
  getStoredUser,
  setStoredUser,
} from '../../../user-storage';

async function getUser(
  user: User | null,
  signal: AbortSignal | undefined,
): Promise<User | null> {
  if (!user) return null;
  const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
    `/user/${user.id}`,
    {
      signal,
      headers: getJWTHeader(user),
    },
  );
  return data.user;
}

interface UseUser {
  user: User | null;
  updateUser: (user: User) => void;
  clearUser: () => void;
}

const initialData = getStoredUser();

export function useUser(): UseUser {
  // call useQuery to update user data from server
  const { data: user } = useQuery({
    queryKey: [queryKeys.user],
    queryFn: ({ signal }) => getUser(initialData, signal), // Never executes
    initialData,
  });

  // Query client
  const queryClient = useQueryClient();

  // meant to be called from useAuth
  function updateUser(newUser: User): void {
    // Set local storage on login

    setStoredUser(newUser);
    // Pre-populate user profile in React Query client
    queryClient.setQueryData([queryKeys.user], newUser);
  }

  // meant to be called from useAuth
  function clearUser() {
    // Clear local storage on logout
    clearStoredUser();

    // Remove user appointments query
    queryClient.removeQueries({
      queryKey: [queryKeys.appointments, queryKeys.user, user?.id],
    });

    // reset user to null in query cache
    queryClient.setQueryData([queryKeys.user], null);
  }

  return { user, updateUser, clearUser };
}
