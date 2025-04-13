import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
          <AvatarFallback className="bg-zinc-800 text-zinc-400">
            JD
          </AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none text-zinc-200">
            John Doe
          </p>
          <p className="text-sm text-zinc-400">john.doe@example.com</p>
        </div>
        <div className="ml-auto font-medium text-zinc-200">+$1,999.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
          <AvatarFallback className="bg-zinc-800 text-zinc-400">
            JC
          </AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none text-zinc-200">
            Jane Cooper
          </p>
          <p className="text-sm text-zinc-400">jane.cooper@example.com</p>
        </div>
        <div className="ml-auto font-medium text-zinc-200">+$1,599.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
          <AvatarFallback className="bg-zinc-800 text-zinc-400">
            RM
          </AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none text-zinc-200">
            Robert Miller
          </p>
          <p className="text-sm text-zinc-400">robert.miller@example.com</p>
        </div>
        <div className="ml-auto font-medium text-zinc-200">+$1,299.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
          <AvatarFallback className="bg-zinc-800 text-zinc-400">
            SD
          </AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none text-zinc-200">
            Sarah Davis
          </p>
          <p className="text-sm text-zinc-400">sarah.davis@example.com</p>
        </div>
        <div className="ml-auto font-medium text-zinc-200">+$899.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
          <AvatarFallback className="bg-zinc-800 text-zinc-400">
            MW
          </AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none text-zinc-200">
            Michael Wilson
          </p>
          <p className="text-sm text-zinc-400">michael.wilson@example.com</p>
        </div>
        <div className="ml-auto font-medium text-zinc-200">+$699.00</div>
      </div>
    </div>
  );
}
