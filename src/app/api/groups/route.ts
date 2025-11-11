import { NextRequest, NextResponse } from 'next/server';
import { ensureGroupsTable, createGroup, getGroupById } from '@/src/db/groupsRepo';

export async function POST(req: NextRequest) {
    try {
        await ensureGroupsTable();
        const body = await req.json();
        const { name, description, creatorUserId } = body ?? {};
        if (!name || !creatorUserId) {
            return NextResponse.json({ error: 'name and creatorUserId are required' }, { status: 400 });
        }
        const group = await createGroup({ name, description, creatorUserId });
        return NextResponse.json(group, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to create group' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'id query param is required' }, { status: 400 });
    try {
        const result = await getGroupById(id);
        return NextResponse.json(result ?? null);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch group' }, { status: 500 });
    }
}

