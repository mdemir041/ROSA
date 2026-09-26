import { NextResponse } from 'next/server';
import os from 'os';

export async function GET() {
  try {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const memUsagePercent = ((usedMem / totalMem) * 100).toFixed(1);

    const uptimeSeconds = os.uptime();
    const days = Math.floor(uptimeSeconds / (3600 * 24));
    const hours = Math.floor((uptimeSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);
    
    let uptimeString = '';
    if (days > 0) uptimeString += `${days}g `;
    if (hours > 0) uptimeString += `${hours}s `;
    uptimeString += `${minutes}d`;

    // A simple heuristic for server health based on load average (if available on Windows it might just be [0,0,0], but we can fallback to mem usage)
    const load = os.loadavg();
    const isHealthy = Number(memUsagePercent) < 90;

    return NextResponse.json({
      success: true,
      data: {
        memory: {
          total: (totalMem / 1024 / 1024 / 1024).toFixed(2) + ' GB',
          used: (usedMem / 1024 / 1024 / 1024).toFixed(2) + ' GB',
          percent: memUsagePercent
        },
        uptime: uptimeString,
        load: load[0] > 0 ? load[0].toFixed(2) : 'Düşük Yük',
        status: isHealthy ? 'Operasyonel' : 'Aşırı Yük',
        version: process.env.npm_package_version || 'v2.0.2'
      }
    });
  } catch (error) {
    console.error('System Monitor Error:', error);
    return NextResponse.json({ success: false, error: 'Sistem bilgisi okunamadı.' }, { status: 500 });
  }
}
