# logging
stderr_path "log/unicorn.stderr.log"
stdout_path "log/unicorn.stdout.log"
pid          "tmp/pids/unicorn.pid"

listen 8080, :tcp_nopush => true

worker_processes 4
preload_app false
timeout 60

# use correct Gemfile on restarts
before_exec do |server|
  ENV['BUNDLE_GEMFILE'] = "#{current_path}/Gemfile"
end

GC.respond_to?(:copy_on_write_friendly=) and
    GC.copy_on_write_friendly = true
