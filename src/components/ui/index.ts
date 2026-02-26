import "../../styles/variables.css";
import "../../styles/utilities.css";

export * from "./tooltip";
export * from "./toast";
export { Toaster } from "./toaster";
export { Toaster as SonnerToaster, toast, notify } from "./sonner";

export { Button, buttonVariants } from "./button";
export { Badge, badgeVariants } from "./badge";
export {
  Card,
  cardVariants,
  CardHeader,
  CardMeta,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
  OperatorCard,
  LinkCard,
} from "./card";
export type { OperatorCardProps, LinkCardProps } from "./card";

export { cn } from "../../lib/utils";
export { useToast, toast as toastAction } from "../../hooks/use-toast";
export { useFocusTrap } from "../../hooks/use-focus-trap";
export { useShortcut } from "../../hooks/use-shortcut";
export { useInView } from "../../hooks/use-in-view";
export type { UseInViewOptions } from "../../hooks/use-in-view";
export { useStagger } from "../../hooks/use-stagger";

export { Input, inputWrapperVariants, Label, HelperText } from "./input";
export { Textarea, textareaVariants } from "./textarea";

export { Checkbox } from "./checkbox";
export { RadioGroup, RadioGroupItem } from "./radio-group";
export { Switch } from "./switch";
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "./select";
export { Avatar, AvatarImage, AvatarFallback, avatarVariants } from "./avatar";
export {
  Progress,
  progressTrackVariants,
  progressFillVariants,
} from "./progress";

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion";
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  tabsTriggerVariants,
} from "./tabs";
export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
} from "./popover";
export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  dialogContentVariants,
} from "./dialog";
export { Separator, separatorVariants } from "./separator";

export {
  SkeletonLine,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonImage,
  SkeletonTableRow,
  skeletonLineVariants,
} from "./skeleton";
export type { SkeletonImageProps, SkeletonTableRowProps } from "./skeleton";
export { EmptyState, emptyStateVariants } from "./empty-state";
export { Alert, alertVariants, TopBanner } from "./alert";
export type { AlertProps, TopBannerProps } from "./alert";

export { Timeline, TimelineItem, timelineItemVariants } from "./timeline";
export type { TimelineProps, TimelineItemProps } from "./timeline";
export { Stepper } from "./stepper";
export type { StepItem, StepperProps } from "./stepper";
export { Pagination, paginationItemVariants } from "./pagination";
export type { PaginationProps } from "./pagination";
export { Breadcrumb } from "./breadcrumb";
export type { BreadcrumbItemData, BreadcrumbProps } from "./breadcrumb";
export { NumberInput, numberInputVariants } from "./number-input";
export type { NumberInputProps } from "./number-input";

export { ViewToggle } from "./view-toggle";
export type { ViewToggleProps } from "./view-toggle";
export { FilterBar, FilterChip } from "./filter-bar";
export type { FilterBarProps, FilterOption } from "./filter-bar";
export { OTPInput } from "./otp-input";
export type { OTPInputProps } from "./otp-input";

export { DatePicker } from "./date-picker";
export type { DatePickerProps } from "./date-picker";

export { Rating } from "./rating";
export type { RatingProps } from "./rating";
export { SessionTimeoutModal } from "./session-timeout-modal";
export type { SessionTimeoutModalProps } from "./session-timeout-modal";
export { FileUpload } from "./file-upload";
export type { FileUploadProps, FileUploadState } from "./file-upload";
export { BottomSheet } from "./bottom-sheet";
export type { BottomSheetProps } from "./bottom-sheet";
export { Carousel, CarouselItem } from "./carousel";
export type { CarouselProps, CarouselItemProps } from "./carousel";
export {
  ResizeHandle,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "./resizable";
export { CHART_COLORS, endfieldChartTheme } from "./chart";
export { RichTextEditor } from "./rich-text-editor";
export type { RichTextEditorProps } from "./rich-text-editor";

export { Footer, FooterColumn, FooterLink } from "./footer";
export type { FooterProps, FooterColumnProps, FooterLinkProps } from "./footer";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableEmpty,
} from "./table";
export type {
  TableRowProps,
  TableHeadProps,
  TableEmptyProps,
  SortDirection,
} from "./table";
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
} from "./list";
export type {
  ListProps,
  ListItemProps,
  LinkListProps,
  LinkListItemProps,
} from "./list";
export { Stat, StatGrid } from "./stat";
export type { StatProps, StatGridProps } from "./stat";
export { SortControl } from "./sort-control";
export type { SortControlProps, SortOption } from "./sort-control";
export type { SortDirection as SortControlDirection } from "./sort-control";
export { PullToRefresh } from "./pull-to-refresh";
export type { PullToRefreshProps } from "./pull-to-refresh";
export { SwipeableItem } from "./swipeable-item";
export type { SwipeableItemProps, SwipeAction } from "./swipeable-item";

/* ── Overlay & Utility (Part 7) ───────────────────────────────────────────── */

export { CopyClipboard } from "./copy-clipboard";
export type { CopyClipboardProps } from "./copy-clipboard";
export { BackToTop } from "./back-to-top";
export type { BackToTopProps } from "./back-to-top";
export { ScrollProgress } from "./scroll-progress";
export type { ScrollProgressProps } from "./scroll-progress";
export { CookieConsent } from "./cookie-consent";
export type { CookieConsentProps } from "./cookie-consent";
export { CommandPalette, useCommandPalette } from "./command-palette";
export type {
  CommandPaletteProps,
  CommandItem,
  CommandGroup,
} from "./command-palette";
export { Dropdown } from "./dropdown";
export type { DropdownProps, DropdownItem, DropdownGroup } from "./dropdown";
export { ContextMenu } from "./context-menu";
export type {
  ContextMenuProps,
  ContextMenuItem,
  ContextMenuGroup,
} from "./context-menu";

// Spoiler + Theme
export { SpoilerBlock, SpoilerInline } from "./spoiler-block";
export type { SpoilerBlockProps, SpoilerInlineProps } from "./spoiler-block";
export { ThemeSwitcher } from "./theme-switcher";
export type { ThemeSwitcherProps } from "./theme-switcher";

export * from "./signature";
