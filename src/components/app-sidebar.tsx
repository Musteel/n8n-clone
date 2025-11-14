"use client";

import {
    CreditCardIcon,
    FolderOpenIcon,
    HistoryIcon,
    KeyIcon,
    LogOutIcon,
    Star,
    StarIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";
import { url } from "inspector";
import { authClient } from "@/lib/auth-client";
import { on } from "events";
import { auth } from "@/lib/auth";
import { userHasActiveSubscription } from "@/features/subscriptions/hooks/use-subscription";
const menuItems = [
    {
        title: "Workflows",
        items: [
            {
                title: "Workflows",
                icon: FolderOpenIcon,
                url: "/workflows",
            },
            {
                title: "Credentials",
                icon: KeyIcon,
                url: "/credentials",
            },
            {
                title: "Executions",
                icon: HistoryIcon,
                url: "/executions",
            }
        ],
    },
];

export const AppSidebar = () => {

    const pathname = usePathname();
    const router = useRouter();
    const { hasActiveSubscription, isLoading } = userHasActiveSubscription()

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild className="gap-x-4 h-10 px-4">
                        <Link href="/workflows" prefetch>
                            <Image src="/logos/logo.svg" alt="n8n logo" width={30} height={30} />
                            <span className="font-semibold text-sm">Nodebase</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarHeader>
            <SidebarContent>
                {menuItems.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            tooltip={item.title}
                                            isActive={item.url === "/"
                                                ? pathname === "/"
                                                : pathname.startsWith(item.url)
                                            }
                                            asChild
                                            className="gap-x-4 h-10 px-4">
                                            <Link href={item.url} prefetch>
                                                <item.icon className="size-4" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    {!isLoading && !hasActiveSubscription && (
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            tooltip="Upgrade to Pro"
                            className="gap-x-4 h-10 px-4"
                            onClick={() => authClient.checkout({slug: "Nodebase-Pro"})}>
                            <StarIcon className="size-4" />
                            <span>Upgrade to Pro</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    )}
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            tooltip="Billing & Pricing"
                            className="gap-x-4 h-10 px-4"
                            onClick={() => authClient.customer.portal()}>
                            <CreditCardIcon className="size-4" />
                            <span>Billing & Pricing</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            tooltip="Sign out"
                            className="gap-x-4 h-10 px-4"
                            onClick={() => authClient.signOut({
                                fetchOptions: {
                                    onSuccess: () => {
                                        router.refresh();
                                        router.push("/login");
                                    }
                                }
                            })}>
                            <LogOutIcon className="size-4" />
                            <span>Sign out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
};