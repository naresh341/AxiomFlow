from typing import List
from .UserSchema import UserRead
from .TeamSchemas import TeamRead


class UserReadWithTeams(UserRead):
    teams: List[TeamRead] = []


class TeamReadWithMembers(TeamRead):
    users: List[UserRead] = []
