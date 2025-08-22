import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import { AdminUser } from "../../types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import UserActions from "./UserActions";

import { Star, Clock, CheckCircle, XCircle } from "lucide-react";

interface UserTableProps {
  users: AdminUser[];
  selectedUsers: string[];
  onSelectUser: (userId: string) => void;
  onSelectAll: () => void;
  onToggleStatus: (userId: string) => void;
}

const UserTable = ({
  users,
  selectedUsers,
  onSelectUser,
  onSelectAll,
  onToggleStatus,
}: UserTableProps) => {
  const i18n = useI18n();

  return (
    <div className="rounded-lg border bg-background/50">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[50px]">
              <Checkbox
                checked={
                  selectedUsers.length === users.length && users.length > 0
                }
                onCheckedChange={onSelectAll}
              />
            </TableHead>
            <TableHead>{i18n.users_tab.table_headers.user}</TableHead>
            <TableHead>{i18n.users_tab.table_headers.role_rating}</TableHead>
            <TableHead>{i18n.users_tab.table_headers.activity}</TableHead>
            <TableHead>{i18n.users_tab.table_headers.status}</TableHead>
            <TableHead className="w-[100px]">
              {i18n.users_tab.table_headers.actions}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className="hover:bg-muted/30 transition-colors"
            >
              <TableCell>
                <Checkbox
                  checked={selectedUsers.includes(user.id)}
                  onCheckedChange={() => onSelectUser(user.id)}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {user.email}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <Badge
                    variant={user.role === "Teacher" ? "default" : "secondary"}
                  >
                    {user.role}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{user.rating}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  {user.role === "Teacher"
                    ? i18n.users_tab.user_stats.sessions_created.replace(
                        "%{count}",
                        user.sessionsCreated?.toString() || "0"
                      )
                    : i18n.users_tab.user_stats.sessions_joined.replace(
                        "%{count}",
                        user.sessionsJoined?.toString() || "0"
                      )}
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {user.lastActive}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {user.status === "Active" ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm">{user.status}</span>
                </div>
              </TableCell>
              <TableCell>
                <UserActions user={user} onToggleStatus={onToggleStatus} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
