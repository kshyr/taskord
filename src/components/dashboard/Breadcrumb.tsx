"use client";

import {usePathname} from "next/navigation";
import Link from "next/link";
import {cn} from "@/src/utils/styles.utils";
import {decodeSlug} from "@/src/utils/general.utils.ts";
import {Fragment} from "react";

export default function Breadcrumb() {
	const pathname = usePathname();

	return (
		<div className="flex h-full gap-2">
			{pathname
			.slice(1)
			.split("/")
			.map((path, index, paths) => (
				<Fragment key={"bread-" + path + index}>
					<Link
						href={`/${paths.slice(0, index + 1).join("/")}`}
						className={cn(
							index === paths.length - 1
								? "cursor-default"
								: "text-muted-foreground",
							"font-head text-xl capitalize tracking-wider",
						)}
					>
						{decodeSlug(path)}
					</Link>
					{index === paths.length - 1 || (
						<span className="text-[22px] text-muted-foreground">/</span>
					)}
				</Fragment>
			))}
		</div>
	);
}
