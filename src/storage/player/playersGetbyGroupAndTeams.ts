import { plaeyersGetByGroup } from "./playersGetByGroup";

export async function plaeyersGetByGroupAndTeams(group: string, team: string) {
  try {
    const storage = await plaeyersGetByGroup(group);
    const players = storage.filter((player) => player.team === team);

    return players;
  } catch (error) {
    throw error;
  }
}
