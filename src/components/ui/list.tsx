import * as React from "react";
import { cn } from "../../lib/utils";

/* ── Diamond Bullet List ─────────────────────────────────────────────────── */

export type ListProps = React.HTMLAttributes<HTMLUListElement>;

const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("space-y-2", className)} {...props} />
  ),
);
List.displayName = "List";

/* ── ListItem (diamond bullet) ───────────────────────────────────────────── */

export type ListItemProps = React.HTMLAttributes<HTMLLIElement>;

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, children, ...props }, ref) => (
    <li
      ref={ref}
      className={cn(
        "flex items-start gap-2.5 pl-5 relative text-sm text-foreground",
        className,
      )}
      {...props}
    >
      <span
        className="absolute left-0 top-[0.45em] text-[8px] text-primary leading-none select-none"
        aria-hidden="true"
      >
        &#9670;
      </span>
      {children}
    </li>
  ),
);
ListItem.displayName = "ListItem";

/* ── Numbered List ───────────────────────────────────────────────────────── */

export type NumberedListProps = React.HTMLAttributes<HTMLOListElement>;

const NumberedList = React.forwardRef<HTMLOListElement, NumberedListProps>(
  ({ className, children, ...props }, ref) => {
    const items = React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return child;
      return React.cloneElement(
        child as React.ReactElement<{ _index?: number }>,
        {
          _index: index,
        },
      );
    });

    return (
      <ol ref={ref} className={cn("space-y-2", className)} {...props}>
        {items}
      </ol>
    );
  },
);
NumberedList.displayName = "NumberedList";

/* ── NumberedListItem ────────────────────────────────────────────────────── */

interface NumberedListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /** @internal Injected by NumberedList */
  _index?: number;
}

const NumberedListItem = React.forwardRef<HTMLLIElement, NumberedListItemProps>(
  ({ className, children, _index = 0, ...props }, ref) => (
    <li
      ref={ref}
      className={cn("flex items-start gap-3 text-sm", className)}
      {...props}
    >
      <span className="font-display text-[11px] text-primary font-bold leading-[1.5] select-none shrink-0">
        {String(_index + 1).padStart(2, "0")}
      </span>
      <span className="text-foreground">{children}</span>
    </li>
  ),
);
NumberedListItem.displayName = "NumberedListItem";

/* ── Description List ────────────────────────────────────────────────────── */

export type DescriptionListProps = React.HTMLAttributes<HTMLDListElement>;

const DescriptionList = React.forwardRef<
  HTMLDListElement,
  DescriptionListProps
>(({ className, ...props }, ref) => (
  <dl ref={ref} className={cn("space-y-3", className)} {...props} />
));
DescriptionList.displayName = "DescriptionList";

/* ── DescriptionTerm ─────────────────────────────────────────────────────── */

const DescriptionTerm = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <dt
    ref={ref}
    className={cn(
      "font-display text-[11px] font-bold tracking-[0.1em] uppercase text-muted-foreground",
      className,
    )}
    {...props}
  />
));
DescriptionTerm.displayName = "DescriptionTerm";

/* ── DescriptionDetail ───────────────────────────────────────────────────── */

const DescriptionDetail = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <dd
    ref={ref}
    className={cn("text-sm text-foreground", className)}
    {...props}
  />
));
DescriptionDetail.displayName = "DescriptionDetail";

/* ── Link List ───────────────────────────────────────────────────────────── */

export type LinkListProps = React.HTMLAttributes<HTMLUListElement>;

const LinkList = React.forwardRef<HTMLUListElement, LinkListProps>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn("divide-y divide-border", className)}
      {...props}
    />
  ),
);
LinkList.displayName = "LinkList";

/* ── LinkListItem ────────────────────────────────────────────────────────── */

export interface LinkListItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  description?: string;
}

const LinkListItem = React.forwardRef<HTMLAnchorElement, LinkListItemProps>(
  ({ className, children, description, ...props }, ref) => (
    <li>
      <a
        ref={ref}
        className={cn(
          "group flex items-center justify-between py-3 px-4",
          "text-sm text-foreground transition-colors",
          "hover:bg-surface-hover hover:text-primary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset",
          className,
        )}
        {...props}
      >
        <div>
          <span>{children}</span>
          {description && (
            <p className="text-[12px] text-muted-foreground mt-0.5">
              {description}
            </p>
          )}
        </div>
        <span
          className="text-muted-foreground/40 group-hover:text-primary transition-all duration-200 group-hover:translate-x-0.5 ml-2 shrink-0"
          aria-hidden="true"
        >
          &rarr;
        </span>
      </a>
    </li>
  ),
);
LinkListItem.displayName = "LinkListItem";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export {
  List,
  ListItem,
  NumberedList,
  NumberedListItem,
  DescriptionList,
  DescriptionTerm,
  DescriptionDetail,
  LinkList,
  LinkListItem,
};
