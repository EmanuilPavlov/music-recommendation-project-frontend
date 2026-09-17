export type HistoryItem = {
    id: string;
    title: string;
    type: string;
    limit: number;
    timestamp: string;
    count: number;
};

export type HistoryGroup = {
    label: string;
    items: HistoryItem[];
};

export type UserSearchHistoryDTO = {
    firebaseUid: string;
    typeOfSearch: string;
    limitRequested: number;
    searchTimestamp: string;
};

function startOfDay(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

function formatOlderLabel(date: Date): string {
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function formatRelativeTime(timestamp: string): string {
    const diffMs = Date.now() - new Date(timestamp).getTime();
    const diffMin = Math.floor(diffMs / 60_000);

    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;

    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;

    const diffDay = Math.floor(diffHr / 24);
    if (diffDay < 7) return `${diffDay}d ago`;

    return formatOlderLabel(new Date(timestamp));
}

function collapseConsecutiveDuplicates(items: HistoryItem[]): HistoryItem[] {
    const collapsed: HistoryItem[] = [];

    for (const item of items) {
        const last = collapsed[collapsed.length - 1];
        if (last && last.type === item.type && last.limit === item.limit) {
            last.count += 1;
        } else {
            collapsed.push({ ...item });
        }
    }

    return collapsed;
}

export function groupHistoryByDate(history: HistoryItem[]): HistoryGroup[] {
    const today = startOfDay(new Date());
    const yesterday = today - 86_400_000;
    const sevenDaysAgo = today - 7 * 86_400_000;

    const order: string[] = [];
    const buckets = new Map<string, HistoryItem[]>();

    function push(label: string, item: HistoryItem) {
        if (!buckets.has(label)) {
            buckets.set(label, []);
            order.push(label);
        }
        buckets.get(label)!.push(item);
    }

    const sorted = [...history].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    const deduped = collapseConsecutiveDuplicates(sorted);

    for (const item of deduped) {
        const day = startOfDay(new Date(item.timestamp));

        if (day === today) push("Today", item);
        else if (day === yesterday) push("Yesterday", item);
        else if (day > sevenDaysAgo) push("Previous 7 Days", item);
        else push(formatOlderLabel(new Date(item.timestamp)), item);
    }

    return order.map((label) => ({ label, items: buckets.get(label)! }));
}